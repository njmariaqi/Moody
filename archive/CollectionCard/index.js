import React from 'react';
import { useNavigate } from "react-router-dom";
import CollectionResult from '../../pages/CollectionResult'
import { useGlobalContext } from '../../utils/globalContext';
import { PRESENT_ONE_COLLECTION } from '../../utils/actions';

const axios = require('axios');

export default function CollectionCard(props) {
  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();
  let collectionImgArry = [];
  const viewCollection = (e) =>{
    console.log('CLICK')
    // props.images.map(async (id)=>{
    //   try{
    //     let res = await axios.get(`https://api.pexels.com/v1/photos/${id}
    //     `, 
    //     {
    //       headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
    //     })
    //     // console.log(res)
    //     collectionImgArry.push(res.data)
    //   }catch(e){
    //     console.error(e)
    //   }
    // })
    var promises = props.images.map(id => axios.get(`https://api.pexels.com/v1/photos/${id}`))

    Promise.all(promises)
      .then(results => {
        results.forEach(result => {
          console.log(result)
          collectionImgArry.push(result.data)
        })
        return collectionImgArry
      })
      .then((collectionImgArry)=>{
        dispatch({
          type: PRESENT_ONE_COLLECTION,
          payload: collectionImgArry
        });
        return collectionImgArry
      })
      .then((collectionImgArry)=>{
        navigate("/collectionresult", {state: { collectionImgArry }});
      })
    // console.log(collectionImgArry)
    // dispatch({
    //   type: PRESENT_ONE_COLLECTION,
    //   payload: collectionImgArry
    // });
    // console.log({ collectionImgArry })
    // debugger
    // navigate("/collectionresult", {state: { collectionImgArry }});
    // console.log('navigate')
  }

  if (collectionImgArry.length > 0) {
    return (
      <CollectionResult props={ collectionImgArry } />
    )
  } else {
    return (
        <div className="col-3 my-3" onClick={viewCollection}>
          <div className="card shadow-sm">
            <img style={{height: '240px'}} src={`https://images.pexels.com/photos/${props.images[0]}/pexels-photo-${props.images[0]}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`} />
            <div>
              <img className='p-2' style={{height: '120px'}} src="https://i.pinimg.com/474x/c4/48/1d/c4481dce8b76644057187e7841340a47.jpg" />
              <img className='p-2' style={{height: '120px'}} src="https://i.pinimg.com/474x/00/40/0d/00400dfb90b6e8ba03652bc240212abe.jpg" />
            </div>
          </div>
          <h3 className="text-center pt-2">{props.collectionName}</h3>
        </div>
      
    );
  }
}