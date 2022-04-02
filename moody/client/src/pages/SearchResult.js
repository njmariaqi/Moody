import React, {useEffect, useState, useRef, useCallback} from 'react';
import { useGlobalContext } from '../utils/globalContext';
import Card from '../components/Card'
import CollectionInfo from '../components/CollectionInfo';
import ImgModal from '../components/ImgModal/index';
import {
  SEARCH_RESULT,
  CLEAR_IMG_HISTORY
} from '../utils/actions';

const axios = require('axios');

export default function SearchResult() {

  const [state, dispatch] = useGlobalContext();
  const {searchResultImg, query} = state;
  const [page, setPage]=useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState (false)
  const observer = useRef()

  // useEffect(()=>{
  //   dispatch({
  //     type:CLEAR_IMG_HISTORY
  //   })
  //   console.log('clear', state.imageArry)
  // }, [query])

  useEffect(async () =>{
    setLoading(true);
    setError(false);

    let searchImg;
    try {
      let res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=5&page=${page}`, {
        headers: {'Authorization': '563492ad6f917000010000015cf5ff7c412542d980a62beb2d41dc62'}
      })
      searchImg = res.data
      dispatch({
        type: SEARCH_RESULT,
        payload: searchImg.photos
      });
      console.log(state, 'home console');

      setHasMore(searchImg.photos.length > 0);
      setLoading(false)

      } catch(err) {
        console.error(err)
      }
  },[page, query])

  const lastElement = useCallback( node => {
    console.log('mmmaria', page)
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
          {searchResultImg.map((e, index) => {
            if (index === searchResultImg.length - 1) {
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
