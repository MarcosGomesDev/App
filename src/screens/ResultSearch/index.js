import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, ActivityIndicator,
TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import Container from '../../components/Container';
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'

const ResultSearch = ({route}) => {
    const name = route.params
    const navigation = useNavigation()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    async function loadProducts() {
        try {
            setLoading(true)
            const res = await api.get(`/products/search/${name}`)

            setProducts(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        
    }

    const renderProducts = (item) => (
        <TouchableOpacity
            data={item}
            key={item._id}
            style={styles.productContainer}
            onPress={() => navigation.navigate('ProductItem', item)}
        >
            <View style={styles.product}>
                <Image style={styles.imgProduct} source={{uri: item.images[0]}} />
                <Text style={styles.category}>{item.category.name}</Text>
                <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={styles.productPrice}>R$ {item.price}</Text>
                <TouchableOpacity 
                    style={styles.addFav}
                >
                    <Icon name="add" size={24} color={Colors.white} />
                </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{paddingVertical: 15, paddingHorizontal: 10}} 
                    onPress={() => navigation.navigate('Início')}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {loading ?
                    (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator style={styles.load} size='large' color={Colors.primary}  />
                        </View>
                    )
                    :
                    (
                        <View style={styles.container}>
                            <Text style={{color: Colors.primary, fontSize: 16, padding: 10}}>Resultados da busca por {name}</Text>
                            {products.map((item) => (
                                renderProducts(item)
                            ))}
                        </View>
                    )
                }
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 5,
        zIndex: 1,
        elevation: 1,
    },
    container: {
        flex: 1,
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    productContainer: {
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
    }
});

export default ResultSearch;