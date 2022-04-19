import { useReducer } from 'react';
import {
  GET_COLLECTION_LIST,
  GET_COLLECTION_INFO,
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
  IMAGE_QUERY,
  CLEAR_IMG_HISTORY,
  SEARCH_RESULT,
  CLEAR_HOME_HISTORY,
  CLEAR_COLLECTION_LIST,
  LOGIN_STATUS,
  LOGOUT_STATUS,
  DELETE_COLLECTION,
  HIDE_ALERT,
  SHOW_ALERT,
} from './actions'

export const reducer = (state, action) => {
  switch(action.type) {
    case LOGIN_STATUS:
      return{
        ...state,
        login: true
      };
    case LOGOUT_STATUS:
      return{
        login: false,
        username: {},
        query:"",
        collectionList:[],
        imageArry: state.imageArry,
        searchResultImg:[],
        collectionImgs: [],
        collectionModal: false,
        imgModal: false,
        imgInfo: {
          id: "",
          photographer: "",
          src: "https://i.pinimg.com/474x/93/0a/4d/930a4d73ceb4343e524c5be477b75b74.jpg"
        }
      };
    // case DELETE_COLLECTION:
    //   return{
    //     ...state,
    //     collectionList:
    //   }
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
    case GET_COLLECTION_INFO:
      return{
        ...state,
        collectionList: state.collectionList.push(action.payload)
      }
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
            console.log('add')
            return {...e, images: [...e.images, action.payload.imgId]}
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
        collectionList: [...state.collectionList, action.payload]
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
    case HIDE_ALERT:
      return {
        ...state,
        alertModal: false
      };
      case SHOW_ALERT:
        return {
          ...state,
          alertModal: {show: true, message: action.payload}
        }
    case HOME_IMAGES:
      return{
        ...state,
        imageArry: [...state.imageArry, ...action.payload]
      }
    case IMAGE_QUERY:
      return{
        ...state,
        query: action.payload
      }
    case CLEAR_IMG_HISTORY:
      return{
        ...state,
        searchResultImg: []
      }
    case CLEAR_HOME_HISTORY:
      return{
        ...state,
        imageArry: []
      }
    case SEARCH_RESULT:
      return{
        ...state,
        searchResultImg: [...state.searchResultImg, ...action.payload]
      }
    case CLEAR_COLLECTION_LIST:
      return{
        ...state,
        collectionList: []
      }

  }
}

export function useGlobalReducer(initialState) {
  return useReducer(reducer, initialState)
}