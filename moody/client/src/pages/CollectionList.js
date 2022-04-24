import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { useGlobalContext } from '../utils/globalContext';
import { GET_USER_INFO, ADD_NEW_COLLECTION, CLEAR_COLLECTION_LIST } from '../utils/actions';

const axios = require('axios');

export default function CollectionList() {
  const [ state, dispatch ] = useGlobalContext();
  const [ coversAreLoaded, setCoversLoaded ] = useState(false);
  const { collectionList, username } = state;
  const { loading, error, data } = useQuery(QUERY_USER, { fetchPolicy: 'cache-and-network' });
  const [ loginStatus, setLoginStatus ] = useState (true);

  useEffect(() => {
    dispatch({
      type: CLEAR_COLLECTION_LIST
    });
  }, [])

  useEffect(() => {
    if (loading === false) {
      try {
        if (!data) {
          setLoginStatus(false)
        }
        if (data) {
          // User information is available, start getting cover images
          const { firstName, lastName, email } = data.user;
          const userCollections = data.user.collections;
          const collectionsToFetch = [];
          if (userCollections.length > 0) {
            for (let i = 0; i < userCollections.length; i++) {
              // Create array of GET requests
              let req = axios.get(
                `https://api.pexels.com/v1/photos/${userCollections[i].images[0]}`, 
                { headers: { 'Authorization': '563492ad6f917000010000015cf5ff7c412542d980a62beb2d41dc62' } }
              );
              collectionsToFetch.push(req);
            }
            // Fire off GET requests
            Promise.all(collectionsToFetch)
              .then((res) => {
                // All cover images are retrieved, good to start rendering
                dispatch({
                  type: GET_USER_INFO,
                  payload: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                  }
                });
                for (let i = 0; i < userCollections.length; i++) {
                  // Update state about new collection information
                  for (let j = 0; j < res.length; j++) {
                    // Images IDs must match to tie cover to collection item
                    if (userCollections[i].images[0] === res[j].data.id) {
                      let collectionData = { ...userCollections[i], cover: res[j].data };
                      dispatch({
                        type: ADD_NEW_COLLECTION,
                        payload: collectionData 
                      });
                    }
                  }
                }
                setCoversLoaded(true);
              })
              .catch((err) => {
                console.error('Error getting cover images.', err)
              })
          }
        }
      } catch (err) {
        console.error('Error getting user information.', err);
      }
    }
  }, [loading])


    return (
      <>
      { collectionList.length > 0 && username && coversAreLoaded && loading === false ?
      (<div>
        <div className="container d-flex justify-content-center mt-5">
          <div style={{marginTop: '80px'}}>
            <img className='rounded-circle d-flex mx-auto' width='128' src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt='user profile'/>
            <h2 className="text-center">{username.firstName} {username.lastName}</h2>
            <p className="text-center">E-mail: {username.email}</p>
          </div>
        </div>
        <div className="album py-3">
        <div className="container">
          <div className="row justify-content-start">
            {
              collectionList.map((e) => {
                return <CollectionCard
                  key = { e._id }
                  id = { e._id }
                  collectionName = { e.name }
                  collectionId = { e._id }
                  images = { e.images }
                  coverSrc = { e.cover.src.large }
                />
              })
            }
          </div>
        </div>
      </div>
      </div>)
      :
      loginStatus ?
        (<div style={{marginTop: '200px'}}>
            <h4 className="d-flex justify-content-center">👋 Hi!</h4>
            <h4 className="d-flex justify-content-center">You have no collection yet.</h4>
            <h4 className="d-flex justify-content-center">Try search for some photos and add your first collection :)</h4>
          </div>)
        :
        (
          <div style={{marginTop: '200px'}}>
            <h4 className="d-flex justify-content-center">👋 Hi!</h4>
            <h4 className="d-flex justify-content-center">You need to log in to view your collections.</h4>
          </div>
        )   
      }
      </>
    ); 
  }
