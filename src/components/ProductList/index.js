
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';
import ProductListItem from './ProductListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { widthPercent } from '../../utils/dimensions';

import useProducts from '../../hooks/useProducts'

const ProductList = () => {
    const [products] = useProducts()
    const navigation = useNavigation()

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