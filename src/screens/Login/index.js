import React, {useState, createRef, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Animated,  Platform, PermissionsAndroid,
TouchableOpacity, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {showToast} from '../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'
import Container from '../../components/Container';
import Colors from '../../styles/Colors'
import Input from '../../components/Input';
import api from '../../services/api'

import { useLogin } from '../../context/LoginProvider';
import {isValidEmail} from '../../utils/validators'
import { widthPercent, heightPercent } from '../../utils/dimensions';
import { storeData, storeLocation, getLocation } from '../../utils/storage';

const Login = () => {
    const {setIsLoggedIn, setProfile} = useLogin()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const animatedScale = useRef(new Animated.Value(0)).current;
    const [load, setLoad] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currentLatitude, setCurrentLatitude] = useState('')
    const [currentLongitude, setCurrentLongitude] = useState('')
    const [wathID, setWathID] = useState(null)

    const emailInput = createRef()
    const passInput = createRef()

    const callLocation = async() => {
        if(Platform.OS === 'ios') {
            getLocation()
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getLocation()
                } else {
                    dispatch(showToast('Permissão negada'))
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    }

    

    const getLocation = async() => {
        Geolocation.getCurrentPosition(
            // ADICIONEI ASYNC PRA PODER DAR AWAIT NA CONST
            async(position) => {
                //PEGA LAT E LONG SEPARADO
                const latitude = JSON.stringify(position.coords.latitude)
                const longitude = JSON.stringify(position.coords.longitude)

                // USERE LAT E LONG DENTRO DE UMA CONST PRA MANDAR PRO ASYNC
                const userLocation = {
                    latitude,
                    longitude,
                }

                //SALVA A LOCALIZACAO NO DISPOSITIVO
                await storeLocation(userLocation)
            },
            (error) => {
                dispatch(showToast('Não foi possível obter sua localização', 'error', 'error'))
            }
        )
        



        const wathID = Geolocation.watchPosition( async(position) => {
            const currentLatitude = JSON.stringify(position.coords.latitude)
            const currentLongitude = JSON.stringify(position.coords.longitude)
            setCurrentLatitude(currentLatitude)
            setCurrentLongitude(currentLongitude)
        })

        setWathID(wathID)
    }

    useEffect(() => {
        animatedScale.setValue(1)
        emailInput.current.resetError()
        passInput.current.resetError()
        let unmounted = false

        if(!unmounted) {
            callLocation()
            
        }

        return () => {
            unmounted = true
        }
    }, [email, password])

    const signIn = async () => {
        animatedScale.setValue(0.8)
        Animated.spring(animatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 20,
            useNativeDriver: true
        }).start()

        if(email === '') {
            dispatch(showToast('Por favor insira o email', 'error', 'error'))
            emailInput.current.focusOnError()
            return
        }

        if(!isValidEmail(email)) {
            dispatch(showToast('Email inválido!', 'error', 'error'))
            emailInput.current.focusOnError()
            return
        }

        if(password === '') {
            dispatch(showToast('Por favor insira a senha', 'error', 'error'))
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
            const response = await api.post('/sign-in/user', {email, password})
            const userInfo = {
                id: response.data.user._id,
                name: response.data.user.name,
                email: response.data.user.email,
                avatar: response.data.user.avatar ?? 'https://res.cloudinary.com/gomesdev/image/upload/v1649718658/avatar_ip9qyt.png',
                seller: response.data.user.seller,
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
            }, 100);
            dispatch(showToast(error.response.data, 'error', 'error'))
        }
    }

    return (
        <Container color={'#fff'}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Olá,</Text>
                    <Text style={styles.title}>Bem-vindo de volta!</Text>
                </View>
            </View>
            <View style={styles.mainContent}>
                <Text
                    style={{alignSelf: 'flex-start', paddingLeft: 40, fontSize: 26,
                    color: Colors.primary, fontWeight: 'bold', marginTop: 10}}
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
                <TouchableOpacity
                    style={styles.forgotBtn}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotBtnText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        signIn
                    }
                    style={styles.btn}
                >
                    <Text style={styles.textBtn}>
                        {load ? <ActivityIndicator size={"small"} color={Colors.white} /> : 'Entrar'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SellerLogin')}
                    style={{marginTop: 20, marginBottom: 50,}}
                >
                    <Text style={[styles.forgotBtnText, {fontWeight: '600'}]}>
                        Entrar como vendedor
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.btnRegister}
                    onPress={() => navigation.navigate('UserRegister')}
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
    btnRegister: {
        alignItems: 'center',
    }
});

export default Login;