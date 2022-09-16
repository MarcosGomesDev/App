import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator,
Image } from 'react-native';
import {useDispatch} from 'react-redux'

import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import {showToast} from '../../../store/modules/toast/actions'

import { useLogin } from '../../../context/LoginProvider';
import { removeData } from '../../../utils/storage';
import api from '../../../services/api'
import Container from '../../../components/core/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Favorites = (props) => {
    const dispatch = useDispatch()
    const {setIsLoggedIn, profile} = useLogin()
    const navigation = useNavigation()
    const [favorites, setFavorites] = useState([])

    const remove = async(item) => {
        
        try {
            const res = await api.delete('/user/favorites/delete', {params: {
                userId: profile.id,
                productId: item._id
            }})
            dispatch(showToast(res.data, 'success', 'favorite'))
        } catch (error) { 
            dispatch(showToast(error.response.data, 'error', 'favorite'))
        }
    }

    async function loadFavorites() {
        try {
            const response = await api.get('/user/favorites',
                {
                    headers: {
                        authorization: `Bearer ${profile.token}`
                    }
                }
            )

            setFavorites(response.data)

        } catch (error) {
            const statusCode = error.response.status
            const data = error.response.data
            
            if(statusCode === 413) {
                dispatch(showToast(data, 'error', 'error'))
                removeData()
                setIsLoggedIn(false)
            }
        }
    }

    useEffect(() => {
        let unmounted = false

        if(!unmounted) {
            loadFavorites()
        }

        return () => {
            unmounted = true
        }
    }, [favorites])

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{width: 50, height: 30, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={30} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>Favoritos</Text>
            </View>
            {favorites.length < 0 ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator style={styles.load} size='large' color={Colors.primary}  />
                </View>
                :
                <ScrollView
                    style={styles.productContainer}
                >
                    <View style={styles.marginContainer}>
                        {favorites.map((item) => (
                            <TouchableOpacity
                                key={item._id}
                                style={styles.productBtn}
                                
                                onPress={() => {
                                    navigation.navigate('ProductItem', item)
                                }}
                            >
                                <View style={styles.productItem}>
                                    <Image
                                        style={styles.imgProduct}
                                        source={{uri: item.images[0]}}
                                    />
                                    <View style={styles.descriptions}>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.productName}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={[styles.productName, {fontSize: 14, marginBottom: 5}]}>
                                            {item.seller.name}
                                        </Text>
                                        <Text style={styles.productPrice}>
                                            R$ {item.price.toString().replace('.', ',')}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => remove(item)}
                                    >
                                        <Icon name="close" size={26} color={Colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            }
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
    },
    title: {
        textAlign: 'center',
        width: '80%',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    productContainer: {
        marginHorizontal: 10
    },
    marginContainer: {
        marginTop: 10
    },
    productBtn: {
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgProduct: {
        width: '40%',
        height: 120,
        borderRadius: 10
    },
    descriptions: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    productName: {
        fontSize: 18,
        color: Colors.primary,
        marginBottom: 5
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
});

export default Favorites;