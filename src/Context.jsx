import { getCurrentUser } from "./db/apiAuth";
import UseFetch from "./hooks/UseFetch";

import { createContext, useEffect, useContext } from "react"

const UrlContext = createContext()

const UrlProvider= ({children}) => {
    const {data:user,loading, check: fetchUser}=UseFetch(getCurrentUser)

    const isAuthenticated = user?.role === "authenticted"

    useEffect(() =>{
        fetchUser()
    },[])

    return <UrlContext.Provider value={{user,fetchUser, loading, isAuthenticated}}>
        {children}
    </UrlContext.Provider>
}

export const UrlState = () => {
   return useContext(UrlContext)
}

export default UrlProvider