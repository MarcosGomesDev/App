
import React, { useState, useEffect, createRef } from 'react';
import {TouchableOpacity, Text, View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'

import Input from '../../../components/Input'
import Container from '../../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'


// create a component
const SellerRegister = ({navigation}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [credential, setCredential] = useState('')

    const nameInput = createRef()
    const lastNameInput = createRef()
    const credentialInput = createRef()

    useEffect(() => {
        nameInput.current.resetError()
        lastNameInput.current.resetError()
        credentialInput.current.resetError()
        
    }, [name, lastName, credential])

    const back = () => {
        navigation.goBack();
    }

    const next = async (name, lastName, credential) => {
        if(name === '') {
            dispatch(showToast('Por favor insira o nome', 'error', 'error'))
            nameInput.current.focusOnError()
            return
        }

        if(name.length < 3) {
            dispatch(showToast('Nome muito curto, mínimo de 3 caracteres!', 'error', 'error'))
            nameInput.current.focusOnError()
            return
        }

        if(lastName === '') {
            dispatch(showToast('Por favor insira o sobrenome', 'error', 'error'))
            lastNameInput.current.focusOnError()
            return
        }

        if(lastName.length < 3) {
            dispatch(showToast('Sobrenome muito curto, mínimo de 3 caracteres!', 'error', 'error'))
            lastNameInput.current.focusOnError()
            return
        }

        const item = {name, lastName, credential}

        navigation.navigate('addressInfo', item)
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
                        title='Nome'
                        ref={nameInput}
                        placeholder='Seu nome'
                        autoCorrect={false}
                        value={name}
                        onChangeText={setName}
                        iconName={'person'}
                    />
                    <Input
                        title='Sobrenome'
                        ref={lastNameInput}
                        placeholder='Seu sobrenome'
                        autoCorrect={false}
                        value={lastName}
                        onChangeText={setLastName}
                        iconName={'person'}
                    />
                    <Input
                        title='CPF'
                        ref={credentialInput}
                        placeholder='444.444.444-44'
                        autoCorrect={false}
                        value={credential}
                        onChangeText={setCredential}
                        iconName={'person'}
                    />
                    <TouchableOpacity
                        onPress={() => next(name, lastName, credential)}
                        style={styles.btn}
                    >
                        <Text style={styles.textBtn}>
                            Próximo
                        </Text>
                    </TouchableOpacity>
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
        alignSelf: 'center'
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});


export default SellerRegister;
