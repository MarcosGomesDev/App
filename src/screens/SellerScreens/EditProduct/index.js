import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import {showToast} from '../../../store/modules/toast/actions'

import Container from '../../../components/Container';
import Input from '../../../components/Input'
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../../services/api'

const EditProduct = ({route}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const item = route.params
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(JSON.stringify(item.price))

    const save = async () => {
        try {
            const response = await api.post('')
        } catch (error) {
            dispatch(showToast(error.response.data, 'error', 'error'))
        }
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Editar Produto
                </Text>
            </View>
            <KeyboardAwareScrollView
                extraScrollHeight={15}
            >
                <View
                    style={{alignItems: 'center'}}
                >
                    <Input
                        iconName={'toc'}
                        value={name}
                        onChangeText={setName}
                    />
                    <Input
                        iconName={'attach-money'}
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>
            </KeyboardAwareScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
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
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});

export default EditProduct;