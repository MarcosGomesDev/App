
import React, { createRef, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput,
KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/modules/toast/actions';

import Container from '../../components/Container'
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { heightPercent } from '../../utils/dimensions';

const VerifyToken = ({route}) => {
    let email = route.params
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const defaultCountDown = 30
    let textInputRef = useRef(null)
    let clockCall = null
    const lengthInput = 6
    const [internalVal, setInternalVal] = useState('')
    const [countDown, setCountDown] = useState(defaultCountDown)
    const [enableResend, setEnableResend] = useState(false)

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock()
        }, 1000);
        return () => {
            clearInterval(clockCall)
        }
    }, [countDown])

    // useEffect(() => {
    //     textInputRef.current.focus()
    // }, [])

    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef()
    const fifthInput = useRef()
    const sixthInput = useRef()
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')
    const [fourth, setFourth] = useState('')
    const [fifth, setFifth] = useState('')
    const [sixth, setSixth] = useState('')

    const token = `${first}${second}${third}${fourth}${fifth}${sixth}`

    const decrementClock = () => {
        if (countDown === 0) {
            setEnableResend(true)
            setCountDown(0)
            clearInterval(clockCall)
        } else {
            setCountDown((prev) => prev-1)
        }
    }

    const sendToken = async () => {
        if(token.length === 6) {
            try {
                const response = await api.post('/verify-token', {params: {email: email}}, {token: token})
                dispatch(showToast(response.data, 'success', 'done'))
                navigation.navigate('ResetPassword', token)
            } catch (error) {
                dispatch(showToast(error.response.data, 'error', 'error'))
            }
        } else {
            dispatch(showToast('token inválido, por favor preencha corretamente', 'error', 'error'))
        }
    }

    const onResendOTP = async () => {
        if(enableResend) {
            setCountDown(defaultCountDown)
            setEnableResend(false)
            clearInterval(clockCall)
            clockCall = setInterval(() => {
                decrementClock()
            }, 1000)
            try {
                const response = await api.post('/forgot-password', {email})
                dispatch(showToast(response.data, 'success', 'email'))
    
            } catch (error) {
                dispatch(showToast(error.response.data, 'error', 'error'))
            }
        }
    }

    const onChangeNumber = () => {
        setInternalVal("")
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
                    <Icon name="arrow-back" size={25} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Insira o código enviado para o seu email.</Text>
            <View style={styles.otpContainer}>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='numeric'
                        ref={firstInput}
                        maxLength={1}
                        onChangeText={text => {
                            setFirst(text)
                            text && secondInput.current.focus()
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='numeric'
                        ref={secondInput}
                        maxLength={1}
                        onChangeText={text => {
                            setSecond(text)
                            text ? thirdInput.current.focus() : firstInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='numeric'
                        ref={thirdInput}
                        maxLength={1}
                        onChangeText={text => {
                            setThird(text)
                            text ? fourthInput.current.focus() : secondInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='numeric'
                        ref={fourthInput}
                        maxLength={1}
                        onChangeText={text => {
                            setFourth(text)
                            text ? fifthInput.current.focus() : thirdInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='numeric'
                        ref={fifthInput}
                        maxLength={1}
                        onChangeText={text => {
                            setFifth(text)
                            text ? sixthInput.current.focus() : fourthInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='numeric'
                        ref={sixthInput}
                        maxLength={1}
                        onChangeText={text => {
                            setSixth(text)
                            !text && fifthInput.current.focus();
                        }}
                    />
                </View>
            </View>

                {/* <View>
                    <TextInput
                        ref={textInputRef}
                        onChangeText={onChangeText}
                        style={{width: 0, height: 0}}
                        value={internalVal}
                        maxLength={lengthInput}
                        keyboardType="numeric"
                    />
                    <View style={styles.containerInput}>
                        {
                            Array(lengthInput).fill().map((data, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.cellView,
                                        {
                                            borderBottomColor: index === internalVal.length ? Colors.danger : Colors.primary,
                                        }
                                    ]}
                                >
                                    <Text
                                        style={styles.cellText}
                                        onPress={() => textInputRef.current.focus()}
                                    >
                                        {internalVal && internalVal.length > 0 ? internalVal[index] : ''}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                </View> */}

                
                <View style={styles.content}>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={sendToken}>
                            <View style={styles.btnChangeNumber}>
                                <Text style={styles.textChange}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onResendOTP}>
                            <View style={styles.btnResend}>
                                <Text
                                    style={[
                                        styles.textResend,
                                        {
                                            color: enableResend ? Colors.primary : 'gray',
                                        }
                                    ]}
                                >
                                    Reenviar código ({countDown})
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        height: heightPercent('20%'),
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
        top: 20
    },
    title: {
        color: Colors.primary,
        fontSize: 16,
        marginTop: 50,
        marginBottom: 50,
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 40,
        height: heightPercent('60%'),
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 70
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary
    },
    bottomView: {
        flexDirection: 'row',
        marginBottom: 50,
        alignItems: 'flex-end'
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textChange: {
        color: Colors.primary,
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textResend: {
        alignItems: 'center',
        fontSize: 16    
    },
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpBox: {
        borderRadius: 10,
        borderColor: Colors.primary,
        borderWidth: 0.8,
    },
    otpText: {
        fontSize: 25,
        color: Colors.primary,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
});

export default VerifyToken;