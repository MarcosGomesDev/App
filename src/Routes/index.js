import React from 'react';

import {AppStack} from './AppStack';
import AuthRoutes from './AuthRoutes';
import { NavigationContainer } from '@react-navigation/native'
import {useLogin} from '../context/LoginProvider';

const Routes = () => {
    const {isLoggedIn} = useLogin();

    return (
        <NavigationContainer>
            {isLoggedIn ? <AuthRoutes /> : <AppStack />}
        </NavigationContainer>
    )
}

export default Routes;