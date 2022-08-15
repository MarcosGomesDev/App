
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';
import api from '../../services/api'
import ProductListItem from './ProductListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { widthPercent } from '../../utils/dimensions';

const ProductList = () => {
    const [products, setProducts] = useState([])
    const navigation = useNavigation()
    
    const getProducts = () => {
        return new Promise((resolve, reject) => {
            api.get('/products')
            .then(response => {
                setProducts(response.data)
                resolve()
            })
            .catch(error => {
                reject()
            })
        })
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
        let unmounted = false

        if(!unmounted) {
            getProducts()
        }

        return () => {
            unmounted = true
        }
    }, [])

    return (
        <View style={styles.container}>
            {products.map((item) => (
                <ProductListItem
                    data={item}
                    key={item._id}
                    onPress={() => navigation.navigate('ProductItem', item)}
                />
            ))}
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: widthPercent(100),
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
});

export default ProductList