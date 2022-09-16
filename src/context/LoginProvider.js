import React, { createContext, useContext, useState, useEffect } from 'react';
import {getData} from '../utils/storage';
const LoginContext = createContext()

const LoginProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});

    const getUser = () => {
        return new Promise((resolve, reject) => {
            getData().then(data => {
                if(!data) {
                    setIsLoggedIn(false);
                    setProfile({});
                    return
                } if(!data.token) {
                    setIsLoggedIn(false);
                    setProfile({});
                    return
                } else {
                    setIsLoggedIn(true);
                    setProfile(data);
                    resolve();
                }
            })
        })
    }

    useEffect(() => {
        getUser()
    } , []);

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