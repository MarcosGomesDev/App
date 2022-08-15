import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AppStack from './AppStack'

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}

export default AppNavigation