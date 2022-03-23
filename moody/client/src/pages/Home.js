import React, {useEffect} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Masonry from 'react-masonry-css'
import Card from '../components/Card'
import {
  PRESENT_IMAGES,
} from '../utils/actions';
import CollectionInfo from '../components/CollectionInfo';
import ImgModal from '../components/ImgModal/index';

const axios = require('axios');

export default function Home() {

  const [state, dispatch] = useGlobalContext();
  const {imageArry} = state;
    
  useEffect(async () =>{
    let searchResult;
      try {
        let res = await axios.get(`https://api.pexels.com/v1/curated?per_page=40`, {
          headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
        })
        searchResult = res.data.photos
        dispatch({
          type: PRESENT_IMAGES,
          payload: searchResult
        });
        console.log(state, 'home console');
      } catch(err) {
        console.error(err)
      }
      
  },[])
  
  
  return (
    <div>
      <div className="album py-5" style={{marginTop: '180px'}}>
      <div className="container">
        <div className="row justify-content-start">
          {imageArry.map((e) => {return <Card id={e.id} key={e.id} imgSrc={e.src.large} imgId={e.id} imgInfo={e} photographer={e.photographer} />})}
        </div>
      </div>
      </div>
      <CollectionInfo />
      <ImgModal />
    </div>
  );
}
