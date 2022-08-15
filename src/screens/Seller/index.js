import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import ProductListItem from '../../components/ProductList/ProductListItem';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';

const Seller = ({ route }) => {
    const [products, setProducts] = useState([])
    const navigation = useNavigation()
    const item = route.params

    async function loadProducts() {
        const res = await api.get('/seller/products', {params: {sellerId: item.seller._id}})
        setProducts(res.data)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{marginTop: 2}}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back" size={30} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    {item.seller.name}
                </Text>
                <TouchableOpacity>
                    <Icon name="shopping-bag" size={34} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                    {products.length > 0 ?
                        (
                            <View style={styles.containerProducts}>
                                {products.map((item) => (
                                    <ProductListItem
                                        data={item}
                                        key={item._id}
                                        onPress={() => navigation.navigate('ProductItem', item)}
                                    />
                                ))}
                            </View>
                        )
                    : (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator style={styles.load} size='large' color={Colors.primary}  />
                        </View>
                    )}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
        marginBottom: 5
    },
    title: {
        fontSize: 20,
        color: Colors.primary,
        marginTop: 4,
    },
    containerProducts: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});

export default Seller;