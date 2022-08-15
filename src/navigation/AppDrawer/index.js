import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawer from '../../components/CustomDrawer'

import { DEFAULT_SCREEN_OPTIONS } from '../options'
import drawerScreens from './screens'
import Colors from '../../styles/Colors'

const { Navigator, Screen } = createDrawerNavigator()

function AppDrawer() {
    return (
        <Navigator
            screenOptions={DEFAULT_SCREEN_OPTIONS}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            {drawerScreens.map(({ name, component, icon }) => <Screen {...{ key: name, name, component }} 
                    options={{ drawerIcon: () => icon,
                            drawerLabelStyle: {fontSize: 15},
                            drawerActiveTintColor: Colors.primary,
                            drawerActiveBackgroundColor: Colors.secondary,
                            drawerItemStyle: {height: 55, width: '100%', justifyContent: 'center',
                            marginLeft: 0, borderRadius: 0, paddingLeft: 10, marginTop: 0}
                        }}
                />
            )}
        </Navigator>
    )
}

export default AppDrawer