import React, {useEffect} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Card from '../components/Card'
import { useLocation } from 'react-router-dom';

const axios = require('axios');

export default function CollectionResult() {
  //console.log(props)
  const { state } = useLocation();
  console.log(state)
  // const [state, dispatch] = useGlobalContext();
  // const {collectionImgs} = state;
  // // console.log(state,'collectionresult')

  // useEffect(()=>{   
  // console.log(JSON.parse(JSON.stringify(state)),'searchresult')
  // }, [state])

  return (
    <div>
      <div className="album py-5" style={{marginTop: '180px'}}>
      <div className="container">
        <div className="row justify-content-start">
          {state.collectionImgArry.map((img) => {return <Card id={img.id} key={img.id} imgSrc={img.src.large} imgId={img.id} />})}
          {/* { collectionImgs.map((el, i) => { return <div>{i}</div> }) } */}
          {/* <div>TEST</div> */}
        </div>
      </div>
    </div>
    </div>
  );
}
