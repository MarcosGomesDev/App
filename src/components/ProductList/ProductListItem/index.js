//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors';

// create a component
const ProductListItem = (props) => {
    let item = props.data

    return (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={props.onPress}
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
    );
};

// define your styles
const styles = StyleSheet.create({
    productContainer: {
        width: 190,
        borderRadius: 10,
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
        // position: 'absolute',
        right: 0,
        top: 10,
    }
});

//make this component available to the app
export default ProductListItem;
