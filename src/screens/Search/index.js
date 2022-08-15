import React, { useState, useEffect, createRef } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text, TextInput, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Container from '../../components/Container';
import Colors from '../../styles/Colors'

const Search = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    
    const textInputRef = createRef()

    useEffect(() => {
        if(search === '') {
            textInputRef.current.focus()
        }

        async function loadSearch() {
            await api.get('/products').then(response => setData(response.data))
        }
        loadSearch()
    }, [data])

    const filteredProducts = search.length > 0
        ? data.filter(data => data.name.includes(search))
        : []

    const goBack = () => {
        navigation.goBack()
        if(search !== '') {
            setSearch('')
        }
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 15}}
                    onPress={goBack}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <TextInput
                    ref={textInputRef}
                    style={styles.input}
                    onChangeText={(text) => setSearch(text)}
                    defaultValue={search}
                    placeholder='Procurar por...'
                    placeholderTextColor="#a9a9a9"
                />
                {search > 0 ? 
                    <TouchableOpacity
                        style={{paddingRight: 10}}
                        onPress={() => setSearch('')}
                    >
                        <Icon name="close" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                : <></>}
            </View>
            <ScrollView>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.itemList}
                            onPress={() => {
                                navigation.navigate('ResultSearch', item.name)
                                setSearch('')
                            }}
                        >
                            <Icon style={styles.icon} name="search" size={24} color={Colors.primary} />
                            <Text style={{paddingLeft: 60, flex: 1, color: Colors.black}}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                )) : (<></>)}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
        marginBottom: 5
    },
    input: {
        flex: 1,
        height: 50,
        color: Colors.primary,
        fontSize: 16,
        width: '68%',
    },
    itemList: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    icon: {
        position: 'absolute',
        left: 20,
        top: 15
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

export default Search;