import React, {useEffect} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Card from '../components/Card'
import ImgModal from '../components/ImgModal/index';
import Masonry from 'react-masonry-css';


const axios = require('axios');

export default function CollectionResult() {

  const [state, dispatch] = useGlobalContext();
  const {collectionImgs} = state;

  return (
    <div>
      <div className="album py-5" style={{marginTop: '180px'}}>
        <div className="container">
          <div className="row justify-content-start">
          <Masonry 
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {collectionImgs.map((img) => {return <Card id={img.id} key={img.id} imgSrc={img.src.large} imgId={img.id} imgInfo={img} photographer={img.photographer}/>})}
          </Masonry>
          </div>
        </div>
      </div>
      <ImgModal />
    </div>
  );
}
