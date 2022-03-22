import { useReducer } from 'react';
import {
  GET_COLLECTION_LIST,
  PRESENT_IMAGES,
  GET_USER_INFO,
  UPDATE_COLLECTION_LIST,
  PRESENT_ONE_COLLECTION,
  CLEAR_COLLECTION_HISTORY
} from './actions'

export const reducer = (state, action) => {
  switch(action.type) {
    case PRESENT_IMAGES:
      return {
        ...state,
        imageArry: action.payload
      };
    case PRESENT_ONE_COLLECTION:
      return {
        ...state,
        collectionImgs: [...state.collectionImgs, action.payload]
      };
    case CLEAR_COLLECTION_HISTORY:
      return{
        ...state,
        collectionImgs:[]
      }
    case GET_COLLECTION_LIST:
      return{
        ...state,
        collectionList: action.payload
      };
    case GET_USER_INFO:
      return {
        ...state,
        username: action.payload
      };
    case UPDATE_COLLECTION_LIST:
      return{
        ...state,
        collectionList: state.collectionList.map((e)=>{
          if(e._id ===action.payload.collectionId){
            e.images.push(action.payload.imgId)
          }
          return e
        })
      }
  }
}

export function useGlobalReducer(initialState) {
  return useReducer(reducer, initialState)
}