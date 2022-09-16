
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, 
StyleSheet, ActivityIndicator } from 'react-native';
import Container from '../../../components/core/Container'

import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Form from '../../../components/FormProduct'
import {useLogin} from '../../../context/LoginProvider'
import { useNavigation } from '@react-navigation/native';
import {showToast} from '../../../store/modules/toast/actions'
import { removeData } from '../../../utils/storage';
import { useDispatch } from 'react-redux';

const NewProduct = () => {
    const {profile} = useLogin()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    async function createProduct(product) {
        if(product.name === '' || product.price === "" || product.category === "" || product.subcategory === "" || product.images === "") {
            dispatch(showToast('Preencha todos os campos!', 'error', 'error'))
            return
        }

        const data = new FormData();
        Object.keys(product).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < product[key].length; i++) {
                    data.append('images', {
                        name: new Date() + 'product',
                        uri: product[key][i],
                        type: 'image/png'
                    })
                }
            } else {
                data.append(key, product[key])
            }
        })
        
        setLoading(true)
        const response = await fetch('http://192.168.0.101:3003/product/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                // authorization: `Bearer ${profile.token}`
            },
            body: data
        })

        const res = await response.json()

        if(response.status === 201){
            setLoading(false)
            dispatch(showToast(res, 'sucess', 'sucess'))
            navigation.goBack
        }
        if(response.status === 413) {
            setLoading(false)
            dispatch(showToast(res, 'error', 'error'))
            removeData()
            setIsLoggedIn(false)
        }
    }

    return (
        <Container color="#fff">
            <View style={styles.header}>
                <TouchableOpacity
                    style={{height: 50, width: 50, alignItems: 'center',
                    zIndex: 20, borderRadius: 150, justifyContent: 'center',}}
                    onPress={navigation.goBack}
                >
                    <Icon
                        name="arrow-back"
                        size={25}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Criar Produto
                </Text>
            </View>
            <Form
                handleSubmit={createProduct}
                titleBtn={loading ? (
                    <ActivityIndicator 
                        size={24}
                        color={Colors.white}
                    />) : 'Criar produto'}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 10,
        zIndex: 10,
        marginBottom: 5
    },
    title: {
        width: '70%',
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    formContainer: {
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 10,
        paddingBottom: 20
    },
    btn: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NewProduct;