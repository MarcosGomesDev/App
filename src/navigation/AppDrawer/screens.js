import React from 'react'

import { getData } from '../../utils/storage'

const user = getData().then()

import Main from '../../screens/Main'
import Profile from '../../screens/Profile'
import Settings from '../../screens/Settings'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'
import Search from '../../screens/Search'
import Products from '../../screens/SellerScreens/Products'
import Favorites from '../../screens/UserScreens/Favorites'

export default [
    {
        icon: <Icon name="home" size={20} color={Colors.primary} />,
        name: 'Início',
        component: Main
    },
    {
        icon: <Icon name="search" size={20} color={Colors.primary} />,
        name: 'Buscar',
        component: Search
    },
    {
        icon: <Icon name="favorite" size={20} color={Colors.primary} />,
        name: 'Favoritos',
        component: Favorites
    },
    {
        icon: <Icon name="storage" size={20} color={Colors.primary} />,
        name: 'Produtos',
        component: Products
    },
    {
        icon: <Icon name="person" size={20} color={Colors.primary} />,
        name: 'Minha conta',
        component: Profile
    },
    {
        icon: <Icon name="settings" size={20} color={Colors.primary} />,
        name: 'Configurações',
        component: Settings
    }
]