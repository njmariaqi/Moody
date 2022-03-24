import { useReducer } from 'react';
import {
  GET_COLLECTION_LIST,
  PRESENT_IMAGES,
  GET_USER_INFO,
  UPDATE_COLLECTION_LIST,
  PRESENT_ONE_COLLECTION,
  CLEAR_COLLECTION_HISTORY,
  SHOW_COLLECTION_MODAL,
  HIDE_COLLECTION_MODAL,
  GET_IMAGE_INFO,
  ADD_NEW_COLLECTION,
  HIDE_IMG_MODAL,
  SHOW_IMG_MODAL,
  HOME_IMAGES,
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
      };
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
      };
    case SHOW_COLLECTION_MODAL:
      return{
        ...state,
        collectionModal: true
      };
    case HIDE_COLLECTION_MODAL:
      return{
        ...state,
        collectionModal: false
      };
    case GET_IMAGE_INFO:
      return{
        ...state,
        imgInfo: action.payload
      };
    case ADD_NEW_COLLECTION:
      return{
        ...state,
        collectionList: state.collectionList.push(action.payload)
      };
    case HIDE_IMG_MODAL:
      return{
        ...state,
        imgModal: false
      };
    case SHOW_IMG_MODAL:
      return{
        ...state,
        imgModal: true
      };
    case HOME_IMAGES:
      return{
        ...state,
        imageArry: [...state.imageArry, ...action.payload]
      }
  }
}

export function useGlobalReducer(initialState) {
  return useReducer(reducer, initialState)
}