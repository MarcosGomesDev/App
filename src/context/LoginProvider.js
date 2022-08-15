import React, { createContext, useContext, useState, useEffect } from 'react';
import {getData} from '../utils/storage';
const LoginContext = createContext()

const LoginProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});

    

    useEffect(() => {
        const getUser = async () => {
            await getData().then(userInfo => {
                if(!userInfo) {
                    setIsLoggedIn(false)
                    setProfile({})
                    return
                }
                if(!userInfo.token) {
                    setIsLoggedIn(false)
                    setProfile({})
                } else {
                    setIsLoggedIn(true)
                    setProfile(userInfo)
                }
            })
        }
        
        getUser()
    }, [])

    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;