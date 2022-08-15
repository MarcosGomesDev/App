import React, { createRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/modules/toast/actions';
import { isValidEmail } from '../../utils/validators';

import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'
import Input from '../../components/Input';
import api from '../../services/api';
import { heightPercent } from '../../utils/dimensions';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const emailInput = createRef()

    useEffect(() => {
        emailInput.current.resetError()
    }, [email])

    const sendEmail = async () => {
        setIsLoading(true)
        if(email === '') {
            dispatch(showToast('Por favor insira o email', 'error', 'email'))
            emailInput.current.focusOnError()
            setIsLoading(false)
            return
        }

        if(!isValidEmail(email)) {
            dispatch(showToast('Email inválido!', 'error', 'email'))
            emailInput.current.focusOnError()
            setIsLoading(false)
            return
        }
        
        try {
            const response = await api.post('/forgot-password', {email})
            dispatch(showToast(response.data, 'success', 'email'))
            setIsLoading(false)
            setTimeout(() => {
                navigation.navigate('VerifyToken', email)
            }, 2000);

        } catch (error) {
            dispatch(showToast(error.response.data, 'error', 'error'))
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back" size={25} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
                <Text style={styles.title}>
                    Esqueceu sua senha?
                </Text>
                <Text style={styles.subTitle}>
                    Insira o seu email para iniciar.
                </Text>
                <Input
                    ref={emailInput}
                    title="Email"
                    iconName={'email'}
                    autoCapitalize="none"
                    placeholder="exemplo@exemplo.com"
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity
                    onPress={sendEmail}
                    style={styles.btn}
                >
                    {isLoading ? 
                        <ActivityIndicator
                            animating={true}
                            size="small"
                            color={Colors.white}
                        /> 
                        :
                        <Text style={styles.textBtn}>
                            Continuar
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        height: heightPercent('20%')
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

export default ForgotPassword;