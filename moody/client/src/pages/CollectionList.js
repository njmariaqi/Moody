import React, {useEffect} from 'react';
import CollectionCard from '../components/CollectionCard';
import { useQuery } from '@apollo/client';
import {QUERY_USER} from '../utils/queries'
import { useGlobalContext } from '../utils/globalContext';
import {GET_COLLECTION_LIST, GET_USER_INFO, ADD_NEW_COLLECTION, CLEAR_COLLECTION_LIST} from '../utils/actions';
import Auth from '../utils/auth';

const axios = require('axios');

let count = 1;

export default function CollectionList() {
  const [state, dispatch] = useGlobalContext();
  const {collectionList, username} = state;
  const {loading, error, data} = useQuery(QUERY_USER
  )
  
  useEffect(()=>{
    dispatch({
      type: CLEAR_COLLECTION_LIST
    })
  },[])

  const testLog = ()=>{
    console.log("length is 0")
  }

  useEffect(()=>{
    try{
      //if(loading) console.log("loading", loading)
      if(data){
        
        console.log("data", data)
        const collection = data.user.collections
        const collections = collection.map(async(e)=>{
          let res = await axios.get(`https://api.pexels.com/v1/photos/${e.images[0]}`, 
          {
            headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
          })
          e = {...e, cover:res.data} 
          console.log("eee", e,loading)
          dispatch({
            type: ADD_NEW_COLLECTION,
            payload: e
          })
        })
        
        const{firstName, lastName, email} = data.user
        dispatch({
          type: GET_USER_INFO,
          payload: {
            firstName: firstName,
            lastName: lastName,
            email: email
          }
        })
      }
    } catch(e){
      console.error(e)
    }
  }, [loading])


    return (
      <>
      {collectionList?
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
            { collectionList.length === 0? 
            <>
            <h4 className="d-flex justify-content-center">👋 Hi!</h4>
            <h4 className="d-flex justify-content-center">You have no collection yet.</h4>
            <h4 className="d-flex justify-content-center">Try search for some photos and add your first collection :)</h4>
            </>
            :
            collectionList.map((e) => {
              return <CollectionCard key = {e._id} id = {e._id} collectionName = {e.name} collectionId = {e._id} images = {e.images} 
            coverSrc = {e.cover.src.large}
            />})}
          </div>
        </div>
      </div>
      </div>)
      :(<div>loading</div>)}
      
      </>
    ); 
  }
