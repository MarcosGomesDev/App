import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, RefreshControl,
StyleSheet, Text, Image, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'
const {width} = Dimensions.get('window')

import api from '../../../services/api'

import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'
import { getData } from '../../../utils/storage';

import ActionFooter, {ActionPrimaryButton} from '../../../components/core/ActionFooter'
import Container from '../../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

const Products = (props) => {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const navigation = useNavigation()

    const getProducts = () => {
        return new Promise((resolve, reject) => {
            getData().then(user => {
                api.get('/seller/products', {
                    params: {sellerId: user.id}
                }).then(res => {
                    setProducts(res.data)
                    resolve()
                }).catch(reject)
            })
        })
    }

    async function loadProducts() {
        const seller = await getData().then()
        try {
            const response = await api.get('/seller/products', {
                params: {sellerId: seller.id}
            })
            setProducts(response.data)
        } catch (error) {
            dispatch(showToast(error.response.data, 'error', 'error'))
        }
    }

    useEffect(() => {
        // loadProducts()
        getProducts()
    }, [])

    async function pullMe() {
        setRefresh(true)
        await loadProducts()
        setRefresh(false)
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
                onPress: confirmDelete
            }
        ])

        async function confirmDelete() {
            try {
                const response = await api.delete(`/product/${productId}/delete`)
                setModalVisible(false)
                dispatch(showToast(response.data, 'success', 'done'))
            } catch (error) {
                dispatch(showToast(error.response.data, 'error', 'error'))
            }
        }
    }

    function handleEditProduct(product) {
        setModalVisible(true)
        setSelectedProduct(product)
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
            {products.length < 0 ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator style={styles.load} size='large' color={Colors.primary} />
                </View>
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
                    {products.map((item) => (
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
                                <Text numberOfLines={1} style={styles.productName}>
                                    {item.name}
                                </Text>
                                <View style={{flexDirection: 'row', marginTop: 20}}>
                                    <Text style={styles.productPrice}>
                                        R$ {item.price}
                                    </Text>
                                    <TouchableOpacity 
                                        onPress={() => handleEditProduct(item)}
                                        style={styles.addFav}
                                    >
                                    <Icon name="edit" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Modal
                                isVisible={modalVisible}
                                animationType="slide"
                                transparent={true}
                                backdropOpacity={0.40}
                                useNativeDriver={true}
                            >
                                <SafeAreaView style={styles.modalContainer}>
                                    <Text style={[styles.title, {margin: 15}]}>
                                        Selecione uma das opções:
                                    </Text>
                                    <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity
                                            onPress={() => goToEdit(item)}
                                            style={[styles.btnModal, {backgroundColor: Colors.primary}]}
                                        >
                                            <Icon name="edit" size={28} color={Colors.white} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => deleteProduct(selectedProduct._id)}
                                            style={[styles.btnModal, {backgroundColor: Colors.danger}]}
                                        >
                                            <Icon name="delete" size={28} color={Colors.white} />
                                        </TouchableOpacity>
                                    </View>
                                    <ActionFooter>
                                        <ActionPrimaryButton
                                            title="Cancelar"
                                            onPress={() => setModalVisible(false)}
                                        />
                                    </ActionFooter>
                                </SafeAreaView>
                            </Modal>
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
    ProductContainer: {
        width: width < 376 ? '47%' : '46%',
        borderRadius: 10,
        marginHorizontal: 3,
        marginLeft: width < 376 ? 7 : 10,
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
    modalContainer: {
        backgroundColor: Colors.white,
        height: 200,
        borderRadius: 20,
        alignItems: 'center'
    },
    btnModal: {
        width: 60,
        height: 60,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 15
    }
});


export default Products;
