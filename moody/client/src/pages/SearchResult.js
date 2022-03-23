import React, {useEffect} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Card from '../components/Card'
import CollectionInfo from '../components/CollectionInfo';
import ImgModal from '../components/ImgModal/index';

const axios = require('axios');

export default function SearchResult() {

  const [state, dispatch] = useGlobalContext();
  const {imageArry} = state;
  console.log(state,'searchresult')

  // useEffect(()=>{   
  // console.log(state,'searchresult')
  // }, [state])

  return (
    <div>
      <div className="album py-5" style={{marginTop: '180px'}}>
        <div className="container">
          <div className="row justify-content-start">
            {imageArry.map((e) => {return <Card id={e.id} key={e.id} imgSrc={e.src.large} imgId={e.id}  imgInfo={e} />})}
          </div>
        </div>
      </div>
      <CollectionInfo />
      <ImgModal />
    </div>
  );
}
