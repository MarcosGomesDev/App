
import React, {useState, createRef, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions, PixelRatio,
TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'

import Container from '../../../components/Container';
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Input from '../../../components/Input';

import api from '../../../services/api'
import {isValidEmail} from '../../../utils/validators'

const UserRegister = ({navigation}) => {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const nameInput = createRef()
    const emailInput = createRef()
    const passInput = createRef()
    const confPassInput = createRef()

    useEffect(() => {
        nameInput.current.resetError()
        emailInput.current.resetError()
        passInput.current.resetError()
        confPassInput.current.resetError()
    }, [name, email, password, confPassword])

    const signUp = async () => {

        if(name === '') {
            dispatch(showToast('Por favor insira o nome', 'error', 'person'))
            nameInput.current.focusOnError()
            return
        }

        if(name.length < 3) {
            dispatch(showToast('Nome muito curto, mínimo de 3 caracteres!', 'error', 'person'))
            nameInput.current.focusOnError()
            return
        }

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

        // if(password.length < 8) {
        //     dispatch(showToast('Muito curta, a senha precisa ter 8 caracteres', 'error', 'lock'))
        //     passInput.current.focusOnError()
        //     return
        // }

        if(password !== confPassword) {
            dispatch(showToast('As senhas não correspondem!', 'error', 'lock'))
            confPassInput.current.focusOnError()
            return
        }

        try {
            setLoad(true)
            const response = await api.post('/sign-up/user', {name, email, password})
            setLoad(false)
            dispatch(showToast(response.data, 'success', 'person'))
            setTimeout(() => {  
                navigation.navigate('Login')
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                setLoad(false)
            }, 100);
            dispatch(showToast(error.response.data, 'error', 'person'))
        }
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
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
                extraScrollHeight={50}
            >
                <ScrollView >
                    <View style={styles.mainContent}>
                        <Text
                            style={{alignSelf: 'flex-start', paddingLeft: 40, fontSize: 26,
                            color: Colors.primary, fontWeight: 'bold', marginTop: 10}}
                        >
                            Cadastro usuário
                        </Text>
                        <Input
                            title="Nome"
                            ref={nameInput}
                            placeholder='Seu nome'
                            autoCorrect={false}
                            value={name}
                            onChangeText={setName}
                            iconName={'person'}
                        />
                        <Input
                            title="Email"
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
                            title="Senha"
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
                            onPress={signUp}
                            style={styles.btn}
                        >
                            <Text style={styles.textBtn}>
                                {
                                    load ? <ActivityIndicator size={"small"} color={Colors.white} /> 
                                    :
                                    'Cadastrar'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.secondary,
        height: 190,
        borderBottomRightRadius: 35,
        justifyContent: 'flex-end',
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
        marginTop: 5,
        flex: 1
    },
    inputContainer: {
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
        borderBottomWidth: 1,
        paddingBottom: 7,
        paddingHorizontal: 10,
        width: '80%'
    },
    input: {
        fontSize: 16,
        paddingLeft: 10,
        color: Colors.primary,
        flex: 1
    },
    forgotBtn: {
        marginTop: 18,
        alignSelf: 'flex-end',
        marginRight: 35
    },
    forgotBtnText: {
        color: Colors.primary
    },
    btn: {
        width: '80%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    bottomContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    btnBottom: {
        position: 'absolute',
        bottom: 0
    }
});

export default UserRegister;