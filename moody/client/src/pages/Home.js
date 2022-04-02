import React, {useEffect, useState, useRef, useCallback} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Card from '../components/Card'
import { useQuery } from '@apollo/client';
import {QUERY_USER} from '../utils/queries'
import {
  HOME_IMAGES,
  CLEAR_HOME_HISTORY
} from '../utils/actions';
import CollectionInfo from '../components/CollectionInfo';
import ImgModal from '../components/ImgModal/index';
import Auth from '../utils/auth'
import auth from '../utils/auth';

const axios = require('axios');

export default function Home() {
  const [page, setPage]=useState(1)
  const [pageLoading, setpageLoading] = useState(true)
  const [pageError, setpageError] = useState(false)
  const [hasMore, setHasMore] = useState (false)
  const [state, dispatch] = useGlobalContext();
  const {imageArry} = state;
  const observer = useRef()
  
  
  const token = Auth.getProfile();
  
  useEffect(()=>{
    dispatch({
      type:CLEAR_HOME_HISTORY
    })
  },[])

    useEffect(async () =>{
      setpageLoading(true);
      setpageError(false);
    // setPage(1);

    let curatedResult;
    try {
      let res = await axios.get(`https://api.pexels.com/v1/curated?per_page=15&page=${page}`, {
        headers: {'Authorization': '563492ad6f917000010000015cf5ff7c412542d980a62beb2d41dc62'}
      })
      curatedResult = res.data
      dispatch({
        type: HOME_IMAGES,
        payload: curatedResult.photos
      });
      console.log(state, 'home console');
      console.log(token,'home token')

      setHasMore(curatedResult.photos.length > 0);
      setpageLoading(false)

      } catch(err) {
        console.error(err)
      }
  },[page])


  const lastElement = useCallback( node => {
    if (pageLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }
  )

  
  return (
    <div>
      <div className="album py-5" style={{marginTop: '180px'}}>
      <div className="container">
        <div className="row justify-content-start">
          {imageArry.map((e, index) => {
            if (index === imageArry.length - 1) {
              return <Card ref={lastElement}
              id={e.id} key={e.id} imgSrc={e.src.large} imgId={e.id} imgInfo={e} photographer={e.photographer} />
            }
            return <Card id={e.id} key={e.id} imgSrc={e.src.large} imgId={e.id} imgInfo={e} photographer={e.photographer} />})}
        </div>
        <div>{pageLoading && 'loading...'}</div>
        <div>{pageError && 'error...'}</div>
      </div>
      </div>
      <CollectionInfo />
      <ImgModal />
    </div>
  );
}
