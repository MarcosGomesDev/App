import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, RefreshControl,
StyleSheet, Text, ActivityIndicator } from 'react-native';
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { removeData } from '../../../utils/storage';
import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'
import {useLogin} from '../../../context/LoginProvider'

import api from '../../../services/api'

import Container from '../../../components/core/Container'
import Item from './Item'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

const Products = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {profile, setIsLoggedIn} = useLogin()
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    
    async function loadProducts() {
        try {
            setLoading(true)
            const response = await api.get('/seller/products', {
                headers: {
                    authorization: `Bearer ${profile.token}`
                }
            })

            if(response.status === 200) {
                setProducts(response.data)
                setLoading(false)
            }
        } catch (error) {
            const statusCode = error.response.status
            const data = error.response.data
                
            if(statusCode === 413) {
                setLoading(false)
                dispatch(showToast(data, 'error', 'error'))
                removeData()
                setIsLoggedIn(false)
            }
            dispatch(showToast(error.response.data, 'error', 'error'))
            setLoading(false)
        }
    }

    useEffect(() => {
        const active = navigation.addListener('focus', () => {
            loadProducts()
            console.log('focado')
        })

        return active
    }, [products])

    async function pullMe() {
        setRefresh(true)
        await loadProducts()
        setRefresh(false)
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Meus Produtos
                </Text>
            </View>
            <View style={styles.addContainer}>
                <TouchableOpacity 
                    style={styles.addBtn}
                    onPress={() => navigation.navigate('NewProduct')}
                >
                    <Icon name="add" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
            {loading ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator style={styles.load} size='large' color={Colors.primary} />
                </View>)
                :
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => pullMe()}
                        />
                    }
                >
                    <View style={styles.marginContainer}>
                        {products.map((item, index) => (
                            <Item
                                key={index}
                                item={item}
                            />
                        ))}
                    </View>
                </ScrollView>
            }
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1
    },
    title: {
        width: '80%',
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addContainer: {
        margin: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    addBtn: {
        height: 50,
        width: 50,
        borderRadius: 150,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.7,
        elevation: 5,
    },
    load: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    marginContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 5
    },
});


export default Products;
