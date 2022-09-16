import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../styles/Colors';
import { useNavigation } from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import { showToast } from '../../../../store/modules/toast/actions';
import ModalOptions from '../ModalOptions';
import api from '../../../../services/api'
const Item = ({item}) => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    const price = item.price.toString()

    const handleOptionsProduct = (product) => {
        setModalVisible(true)
        setSelectedProduct(product)
    }

    const goToEdit = (item) => {
        setModalVisible(false)
        navigation.navigate('EditProduct', item)
    }

    async function deleteProduct(productId) {
        Alert.alert('Excluir', 'Você deseja realmente exluir este produto?', [
            {
                text: 'Não',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => confirmDelete(productId)
            }
        ])
    }

    async function confirmDelete(id) {
        try {
            const response = await api.delete(`/product/${id}/delete`)
            setModalVisible(false)
            dispatch(showToast(response.data, 'success', 'done'))
        } catch (error) {
            dispatch(showToast(error.response.data, 'error', 'error'))
        }
    }

    const onCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <TouchableOpacity
                key={item._id} 
                style={styles.ProductContainer}
                onPress={() => navigation.navigate('ProductItem', item)}
            >
                <View style={styles.product}>
                    <Image
                        style={styles.imgProduct}
                        source={{uri: item.images[0]}}
                    />
                    <Text style={styles.category}>
                        {item.category.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={styles.productName}
                    >
                        {item.name}
                    </Text>
                    <View style={styles.footer}>
                        <Text style={styles.productPrice}>
                            R$ {price.replace('.', ',')}
                        </Text>
                        <TouchableOpacity 
                            onPress={() => handleOptionsProduct(item)}
                            style={styles.addFav}
                        >
                        <Icon name="edit" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            <ModalOptions
                isVisible={modalVisible}
                onCancel={onCloseModal}
                onPressEdit={() => goToEdit(item)}
                onPressDelete={() => deleteProduct(selectedProduct._id)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    ProductContainer: {
        width: '46%',
        borderRadius: 10,
        marginHorizontal: 3,
        marginLeft: 10,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    product: {
        width: '100%',
    },
    imgProduct: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10
    },
    category: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    productName: {
        width: 170,
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
    productPrice: {
        flex: 1,
        paddingLeft: 12,
        marginTop:15,
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
    addFav: {
        width: 40,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20
    }
});

export default Item;
