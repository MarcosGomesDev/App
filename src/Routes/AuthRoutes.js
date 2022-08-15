import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import {DEFAULT_SCREEN_OPTIONS} from '../navigation/options'
import {useLogin} from '../context/LoginProvider'
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

import Main from '../screens/Main'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'
import Search from '../screens/Search'
import Favorites from '../screens/UserScreens/Favorites'
import Seller from '../screens/Seller'
import ResultSearch from '../screens/ResultSearch'

import EditProduct from '../screens/SellerScreens/EditProduct'
import NewProduct from '../screens/SellerScreens/NewProduct'
import ProductItem from '../screens/ProductItem'

import CustomDrawer from '../components/CustomDrawer'
import Products from '../screens/SellerScreens/Products'

import Colors from '../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const SellerDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={
                {
                    headerShown: false,
                    drawerLabelStyle: {fontSize: 15},
                    drawerActiveTintColor: Colors.primary,
                    drawerActiveBackgroundColor: Colors.secondary,
                    drawerItemStyle: {height: 55, width: '100%', justifyContent: 'center', marginLeft: 0, 
                    borderRadius: 0, paddingLeft: 10, marginTop: 0}
                }
            }
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="storage" size={20} color={Colors.primary} />)
                }}
                name="Meus produtos" component={Products}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="person" size={20} color={Colors.primary} />)
                }}
                name="Minha conta" component={Profile}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="settings" size={20} color={Colors.primary} />)
                }} 
                name="Configurações" component={Settings}
            />
        </Drawer.Navigator>
    )
}

const UserDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={
                {
                    headerShown: false,
                    drawerLabelStyle: {fontSize: 15},
                    drawerActiveTintColor: Colors.primary,
                    drawerActiveBackgroundColor: Colors.secondary,
                    drawerItemStyle: {height: 55, width: '100%', justifyContent: 'center', marginLeft: 0, 
                    borderRadius: 0, paddingLeft: 10, marginTop: 0}
                }
            }
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="home" size={20} color={Colors.primary} />)
                }}
                name="Início" component={Main}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="search" size={20} color={Colors.primary} />)
                }}
                name="Buscar" component={Search}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="favorite" size={20} color={Colors.primary} />)
                }}
                name="Favoritos" component={Favorites}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="person" size={20} color={Colors.primary} />)
                }}
                name="Minha conta" component={Profile}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: (() => <Icon name="settings" size={20} color={Colors.primary} />)
                }} 
                name="Configurações" component={Settings}
            />
        </Drawer.Navigator>
    )
}

const AuthRoutes = () => {
    const {profile} = useLogin()

    return (
        <Stack.Navigator
            screenOptions={DEFAULT_SCREEN_OPTIONS}
        >
            <Stack.Screen name="Main" component={profile.seller === true ? SellerDrawer : UserDrawer} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
            <Stack.Screen name="NewProduct" component={NewProduct} />
            <Stack.Screen name="ProductItem" component={ProductItem} />
            <Stack.Screen name="Seller" component={Seller} />
            <Stack.Screen name="ResultSearch" component={ResultSearch} />
        </Stack.Navigator>
    );
};

export default AuthRoutes;