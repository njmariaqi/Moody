import React, { useContext} from 'react';
import { useGlobalReducer } from './reducers';


export const GlobalContext = React.createContext();


export default function GlobalProvider({value=[], ...props}) {
  const [state, dispatch] = useGlobalReducer({
    username: {},
    query:"",
    collectionList:[],
    imageArry: [],
    searchResultImg:[],
    collectionImgs: [],
    collectionModal: false,
    imgModal: false,
    imgInfo: {
      id: "",
      photographer: "",
      src: "https://i.pinimg.com/474x/93/0a/4d/930a4d73ceb4343e524c5be477b75b74.jpg"
    }
  })
  
  return <GlobalContext.Provider value={[state, dispatch]} {...props} />
}

export const useGlobalContext = () => {return useContext(GlobalContext);}