import React, {useState, createRef, useEffect} from 'react';
import { View, Text, StyleSheet,
TouchableOpacity, ActivityIndicator } from 'react-native';

import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'

import Container from '../../../components/Container';
import Colors from '../../../styles/Colors'
import Input from '../../../components/Input';
import api from '../../../services/api'

import { useLogin } from '../../../context/LoginProvider';
import { widthPercent, heightPercent } from '../../../utils/dimensions';
import {isValidEmail} from '../../../utils/validators'
import { storeData, getData } from '../../../utils/storage';

const SellerLogin = ({navigation}) => {
    const {setIsLoggedIn, setProfile} = useLogin()
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailInput = createRef()
    const passInput = createRef()

    useEffect(() => {
        emailInput.current.resetError()
        passInput.current.resetError()
    }, [email, password])

    const signIn = async () => {
        if(email === '') {
            dispatch(showToast('Por favor insira o email', 'error', 'person'))
            emailInput.current.focusOnError()
            return
        }

        if(!isValidEmail(email)) {
            dispatch(showToast('Email inválido!', 'error', 'person'))
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

        try {
            setLoad(true)
            const response = await api.post('/sign-in/seller', {email, password})
            const userInfo = {
                id: response.data.seller._id,
                name: response.data.seller.name,
                email: response.data.seller.email,
                seller: response.data.seller.seller,
                avatar: response.data.seller.avatar ?? 'https://res.cloudinary.com/gomesdev/image/upload/v1649718658/avatar_ip9qyt.png',
                token: response.data.token,
            }
            await storeData(userInfo)
            setLoad(false)
            setEmail('')
            setPassword('')
            setProfile(userInfo)
            setIsLoggedIn(true)
        } catch (error) {
            setTimeout(() => {
                setLoad(false)
            }, 90);
            dispatch(showToast(error.response.data, 'error', 'person'))
        }
    }

    return (
        <Container>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Olá,</Text>
                    <Text style={styles.title}>Bem-vindo de volta!</Text>
                </View>
            </View>
            <View style={styles.mainContent}>
                <Text
                    style={{alignSelf: 'flex-start', paddingLeft: 40, fontSize: 26, color: Colors.primary,
                    fontWeight: 'bold', marginTop: 10}}
                >Login</Text>
                <Input
                    title="Email"
                    ref={emailInput}
                    placeholder='email@exemplo.com'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    iconName={'person'}
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
                <TouchableOpacity style={styles.forgotBtn}>
                    <Text style={styles.forgotBtnText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signIn}
                    style={styles.btn}
                >
                    <Text style={styles.textBtn}>{load ? <ActivityIndicator size={"small"} color={Colors.white} /> : 'Entrar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{marginTop: 20, marginBottom: 50}}
                >
                    <Text style={[styles.forgotBtnText, {fontWeight: '600'}]}>Entrar como usuário</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bntRegister}
                    onPress={() => navigation.navigate('SellerRegister')}
                >
                <Text style={styles.forgotBtnText}>
                    Não possui conta? Cadastre-se
                </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.secondary,
        height: heightPercent('25%'),
        borderBottomRightRadius: 35,
        justifyContent: 'flex-end'
    },
    headerContent: {
        marginBottom: 50
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
    inputContainer: {
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
        borderBottomWidth: 1,
        paddingBottom: 7,
        paddingHorizontal: 10,
        width: '80%'
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
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    bntRegister: {
        alignItems: 'center',
    }
});

export default SellerLogin;