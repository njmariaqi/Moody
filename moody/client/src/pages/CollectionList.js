import React, {useEffect} from 'react';
import CollectionCard from '../components/CollectionCard'
import { useGlobalContext } from '../utils/globalContext';

const axios = require('axios');

export default function CollectionList() {
  const [state, dispatch] = useGlobalContext();
  const {collectionList, username} = state;

  return (
    <div>
      <div className="container d-flex justify-content-center mt-5">
        <div style={{marginTop: '80px'}}>
          <img className='rounded-circle d-flex mx-auto' width='128' src='https://images.squarespace-cdn.com/content/v1/562146dae4b018ac1df34d5f/1450121660392-KS2FGMOXB7VL1JNQ487I/person-placeholder.jpg?format=1000w' alt='user profile'/>
          <h2 className="text-center">{username.firstName} {username.lastName}</h2>
          <p className="text-center">E-mail: {username.email}</p>
          {/* <p className="text-center">Profile</p> */}
        </div>
      </div>
      <div className="album py-3">
      <div className="container">
        <div className="row justify-content-start">
          {collectionList.map((e) => {return <CollectionCard key = {e._id} id = {e._id} collectionName = {e.name} collectionId = {e._id} images = {e.images} coverSrc = {e.cover.src.large}/>})}
        </div>
      </div>
    </div>
    </div>
  );
}
