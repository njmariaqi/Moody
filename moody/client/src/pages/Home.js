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
import CollectionInfo from '../components/CollectionInfo';

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
      <div 
      className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" show="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create New Collection</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src='https://images.pexels.com/photos/10220193/pexels-photo-10220193.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='testing img'></img>
              <input 
                name='collectionName'
                type="text" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='collectionName' id="inputCollectionName"></input>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
      <CollectionInfo />
    </div>
  );
}
