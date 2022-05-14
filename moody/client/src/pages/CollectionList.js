import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { useGlobalContext } from '../utils/globalContext';
import { GET_USER_INFO, ADD_NEW_COLLECTION, CLEAR_COLLECTION_LIST } from '../utils/actions';

const axios = require('axios');

export default function CollectionList() {
  const [ state, dispatch ] = useGlobalContext();
  const [ coverIsLoaded, setCoverLoaded ] = useState(false);
  const [ collectionExists, setCollectionExists ] = useState(false);
  const { collectionList,collectionUpdates, username } = state;
  const { loading, error, data } = useQuery(QUERY_USER);
  const [loginStatus, setLoginStatus] = useState (true);

  useEffect(()=>{
    dispatch({
      type: CLEAR_COLLECTION_LIST
    })
  },[])

  useEffect(()=>{
    try {
      if (!data) {
        setLoginStatus(false)
      }
      if (data) {
        console.log("update collection", collectionUpdates)
        const collection = data.user.collections;
        console.log("collections from database", collection)
        if (collection.length > 0) {
          for (let i = 0; i < collection.length; i++) {
            if (i === collection.length - 1) {
              setCoverLoaded(true);
            }
            getCoverImg(collection[i]);
          }
          setCollectionExists(true);
          console.log("collection data", data)
        } else {
          // no collection exists
        }
        async function getCoverImg (col) {
          try {
            const res = await axios.get(
              `https://api.pexels.com/v1/photos/${col.images[0]}`, 
              { headers: { 'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a' } }
            );
            col = {...col, cover: res.data};
            dispatch({
              type: ADD_NEW_COLLECTION,
              payload: col
            });
          } catch (err) {
            // TODO handle error
            console.error('Unable to fetch cover images.',err);
          }
        }
        
        const{ firstName, lastName, email } = data.user;
        dispatch({
          type: GET_USER_INFO,
          payload: {
            firstName: firstName,
            lastName: lastName,
            email: email
          }
        })
      }
    } catch (err) {
      console.error("CANNOT GET USER", err);
    }
  }, [loading, collectionUpdates])


    return (
      <>
      { collectionList && username && coverIsLoaded && collectionExists ?
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
            {collectionList.map((e) => {
              return <CollectionCard key = {e._id} id = {e._id} collectionName = {e.name} collectionId = {e._id} images = {e.images} 
            coverSrc = {e.cover.src.large}
            />})}
          </div>
        </div>
      </div>
      </div>)
      :
      loginStatus?
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
