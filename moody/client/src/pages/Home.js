import React, {useEffect} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Masonry from 'react-masonry-css'
import Card from '../components/Card'
import {
  PRESENT_IMAGES,
  GET_COLLECTION_LIST,
  GET_USER_INFO
} from '../utils/actions';
import {QUERY_USER} from '../utils/queries'
import { useQuery } from '@apollo/client';


const axios = require('axios');

export default function Home() {

  const [state, dispatch] = useGlobalContext();
  const {imageArry, collectionList} = state;
    
  useEffect(async () =>{
    let searchResult;
      try {
        let res = await axios.get(`https://api.pexels.com/v1/curated`, {
          headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
        })
        searchResult = res.data.photos
      } catch(err) {
        console.error(err)
      }
      dispatch({
        type: PRESENT_IMAGES,
        payload: searchResult
      });
      console.log(state, 'home console');
  },[])
  
  
  return (
    <div>
      <div className="album py-5" style={{marginTop: '180px'}}>
      <div className="container">
        <div className="row justify-content-start">
          {imageArry.map((e) => {return <Card id={e.id} key={e.id} imgSrc={e.src.large} imgId={e.id} />})}
        </div>
      </div>
    </div>
    </div>
  );
}
