import React, { useContext} from 'react';
import { useGlobalReducer } from './reducers';


export const GlobalContext = React.createContext();


export default function GlobalProvider({value=[], ...props}) {
  const [state, dispatch] = useGlobalReducer({
    username: {},
    collectionList:[],
    imageArry: [],
    collectionImgs: []
  })
  
  return <GlobalContext.Provider value={[state, dispatch]} {...props} />
}

export const useGlobalContext = () => {return useContext(GlobalContext);}