import React, { useState, useEffect, createRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'

import Input from '../../../components/Input'
import Container from '../../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

import api from '../../../services/api'
import {isValidEmail} from '../../../utils/validators'

const EmailInfo = ({navigation, route}) => {
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    let item = route.params
    const emailInput = createRef()
    const passInput = createRef()
    const confPassInput = createRef()

    useEffect(() => {
        emailInput.current.resetError()
        passInput.current.resetError()
        confPassInput.current.resetError()
    }, [email, password, confPassword])

    const SignUp = async () => {
        if(email === '') {
            dispatch(showToast('Por favor insira o email', 'error', 'email'))
            emailInput.current.focusOnError()
            return
        }

        if(!isValidEmail(email)) {
            dispatch(showToast('Email inválido!', 'error', 'email'))
            emailInput.current.focusOnError()
            return
        }

        if(password === '') {
            dispatch(showToast('Por favor insira a senha', 'error', 'lock'))
            passInput.current.focusOnError()
            return
        }

        if(password.length < 8) {
            dispatch(showToast('Muito curta, a senha precisa ter 8 caracteres', 'error', 'lock'))
            passInput.current.focusOnError()
            return
        }

        if(password !== confPassword) {
            dispatch(showToast('As senhas não correspondem!', 'error', 'lock'))
            confPassInput.current.focusOnError()
            return
        }

        try {
            const response = await api.post('/sign-up/seller', {
                name: item.name,
                lastName: item.lastName,
                credential: item.credential,
                cep: item.cep,
                logradouro: item.logradouro,
                numero: item.numero,
                complemento: item.complemento,
                bairro: item.bairro,
                localidade: item.localidade,
                UF: item.UF,
                email,
                password
            })
            setLoad(false)
            dispatch(showToast(response.data, 'success', 'person'))
            setTimeout(() => {  
                navigation.navigate('SellerLogin')
            }, 2000);
            
        } catch (err) {
            Alert.alert('Erro', 'Erro ao criar vendedor, tente novamente mais tarde!')
        }
    }

    const back = () => {
        navigation.goBack()
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={back}
                    style={styles.backBtn}
                >
                    <Icon name="arrow-back" size={22} color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    
                    <Text style={styles.title}>Olá,</Text>
                    <Text style={[styles.title, {fontSize: 20}]}>
                        Por favor insira seus dados!
                    </Text>
                </View>
            </View>
            <KeyboardAwareScrollView
                extraScrollHeight={15}
            >
                <View style={styles.mainContent}>
                    <Text
                        style={{alignSelf: 'flex-start', paddingLeft: 40, fontSize: 26, color: Colors.primary,
                        fontWeight: 'bold', marginTop: 10}}
                    >
                        Cadastro vendedor
                    </Text>
                    <Input
                        title='Email'
                        ref={emailInput}
                        placeholder='email@exemplo.com'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                        iconName={'email'}
                        keyboardType="email-address"
                    />
                    <Input
                        title='Senha'
                        ref={passInput}
                        placeholder='********'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                        iconName={'lock'}
                        secureTextEntry
                    />
                    <Input
                        title="Confirmar senha"
                        ref={confPassInput}
                        placeholder='********'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={confPassword}
                        onChangeText={setConfPassword}
                        iconName={'lock'}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        onPress={SignUp}
                        style={styles.btn}
                    >
                        <Text style={styles.textBtn}>
                            {
                                load ? <ActivityIndicator size='small' color={Colors.white} /> : 'Enviar'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.secondary,
        height: 190,
        borderBottomRightRadius: 35,
        justifyContent: 'flex-end'
    },
    headerContent: {
        marginBottom: 50
    },
    backBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        height: 35,
        width: 35,
        backgroundColor: Colors.primary,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Colors.primary,
        paddingLeft: 20,
        fontWeight: 'bold',
        textAlign: 'left', 
        fontSize: 26,
    },
    mainContent: {
        alignItems: 'center',
        marginTop: 10,
        flex: 1
    },
    btn: {
        width: '80%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EmailInfo;
