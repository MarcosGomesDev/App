import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import {showToast} from '../../../store/modules/toast/actions'

import Container from '../../../components/core/Container';
import Form from '../../../components/FormProduct'
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api'

const EditProduct = ({route}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const item = route.params

    const save = async (product) => {
        console.log('isso será atualizado no backend', product)
    }

    return (
        <Container color='#fff'>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{zIndex: 10}}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back"
                        size={26}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Editar Produto
                </Text>
            </View>
            <Form
                productData={item}
                titleBtn={loading ? (
                    <ActivityIndicator 
                        size={24}
                        color={Colors.white}
                    />) : 'Salvar'}
                handleSubmit={save}
            />
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
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        elevation: 15,
        zIndex: 15,
        marginBottom: 5
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