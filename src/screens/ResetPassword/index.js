import React, { createRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/modules/toast/actions';

import Container from '../../components/core/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';
import api from '../../services/api'
import Input from '../../components/Input';

const ResetPassword = ({route}) => {
    const dispatch = useDispatch
    const navigation = useNavigation()
    const token = route.params
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    
    const passInput = createRef()
    const confPassInput = createRef()

    useEffect(() => {
        passInput.current.resetError()
        confPassInput.current.resetError()
    }, [password, confPassword])

    const resetPassword = async () => {
        if(password === '') {
            dispatch(showToast('a senha é obrigatória', 'error', 'error'))
            return
        }

        if(confPassword !== password) {
            dispatch(showToast('As senhas não correspondem', 'error', 'error'))
            return
        }

        try {
            const response = await api.post('', {params: {token: token}}, {password})
            dispatch(showToast(response.data, 'success', 'done'))
            setTimeout(() => {
                navigation.navigate('Login')
            }, 1000);
        } catch (error) {
            dispatch(showToast(error.response.data, 'error', 'error'))
        }
    }

    return (
        <Container>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back" size={25} color={Colors.white} />
                </TouchableOpacity>
            <View style={styles.mainContent}>
                <Text style={styles.subTitle}>
                    Insira a sua nova senha.
                </Text>
                <Input
                    ref={passInput}
                    title={'Senha'}
                    iconName={'lock'}
                    autoCapitalize="none"
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    ref={confPassInput}
                    title={'Confirmar senha'}
                    iconName={'lock'}
                    autoCapitalize="none"
                    placeholder="********"
                    value={confPassword}
                    onChangeText={setConfPassword}
                />
                <TouchableOpacity
                    onPress={resetPassword}
                    style={styles.btn}
                >
                    <Text style={styles.textBtn}>
                        Continuar
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center'
    },
    backBtn: {
        height: 40,
        width: 40,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 150,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        position: 'absolute',
        top: 40
    },
    title: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        paddingLeft: 20
    },
    subTitle: {
        color: Colors.primary,
        fontSize: 14,
        alignSelf: 'flex-start',
        paddingLeft: 20
    },
    mainContent: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    btn: {
        width: '80%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ResetPassword;