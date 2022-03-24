import React, {useEffect, useState, useRef, useCallback, createRef} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Card from '../components/Card'
import {
  HOME_IMAGES,
} from '../utils/actions';
import CollectionInfo from '../components/CollectionInfo';
import ImgModal from '../components/ImgModal/index';

const axios = require('axios');

export default function Home() {
  const [page, setPage]=useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState (false)
  const [state, dispatch] = useGlobalContext();
  const {imageArry} = state;
  const observer = useRef()

  useEffect(async () =>{
    setLoading(true);
    setError(false);
    setPage(1);

    let curatedResult;
    try {
      let res = await axios.get(`https://api.pexels.com/v1/curated?per_page=40&page=${page}`, {
        headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
      })
      curatedResult = res.data
      dispatch({
        type: HOME_IMAGES,
        payload: curatedResult.photos
      });
      console.log(state, 'home console');

      setHasMore(curatedResult.photos.length > 0);
      setLoading(false)

      } catch(err) {
        console.error(err)
      }
  },[page])
  
  //const cardRef = useRef();


  const lastElement = useCallback( node => {
    console.log('mmmaria')
    if (loading) return
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
        <div>{loading && 'loading...'}</div>
        <div>{error && 'error...'}</div>
      </div>
      </div>
      <CollectionInfo />
      <ImgModal />
    </div>
  );
}
