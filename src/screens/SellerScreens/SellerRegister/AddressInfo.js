import React, { useEffect, useState, createRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {showToast} from '../../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'

import Input from '../../../components/Input'
import Container from '../../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

const AddressInfo = ({navigation, route}) => {
    const dispatch = useDispatch()
    let item = route.params
    const [cep, setCep] = useState('')
    const [complemento, setComplemento] = useState('')
    const [logradouro, setLogradrouro] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [UF, setUF] = useState('')

    const cepInput = createRef()
    const lograInput = createRef()
    const numInput = createRef()
    const bairroInput = createRef()
    const localInput = createRef()
    const UFInput = createRef()

    useEffect(() => {
        cepInput.current.resetError()
        lograInput.current.resetError()
        numInput.current.resetError()
        bairroInput.current.resetError()
        localInput.current.resetError()
        UFInput.current.resetError()
    }, [cep, logradouro, numero, bairro, localidade, UF])

    if(cep.length === 8) {
        callCEP(cep)
    }

    async function callCEP(cep) {
        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then((data) => {
                setLogradrouro(data.logradouro)
                setBairro(data.bairro)
                setLocalidade(data.localidade)
                setUF(data.uf)
            })
    }

    const next = () => {
        if(cep === '') {
            dispatch(showToast('O CEP é obrigatório', 'error', 'error'))
            cepInput.current.focusOnError()
            return
        }

        if(cep.length < 8) {
            dispatch(showToast('O CEP é obrigatório', 'error', 'error'))
            cepInput.current.focusOnError()
            return
        }

        if(logradouro === '') {
            dispatch(showToast('A rua é obrigatória', 'error', 'error'))
            lograInput.current.focusOnError()
            return
        }

        if(numero === '') {
            dispatch(showToast('O número é obrigatório', 'error', 'error'))
            numInput.current.focusOnError()
            return
        }

        if(bairro === '') {
            dispatch(showToast('O bairro é obrigatório', 'error', 'error'))
            bairroInput.current.focusOnError()
            return
        }

        if(localidade === '') {
            dispatch(showToast('A cidade é obrigatória', 'error', 'error'))
            localInput.current.focusOnError()
            return
        }

        if(UF === '') {
            dispatch(showToast('O estado é obrigatório', 'error', 'error'))
            UFInput.current.focusOnError()
            return
        }

        const send = {
            name: item.name,
            lastName: item.lastName,
            credential: item.credential,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            UF,

        }

        navigation.navigate('EmailInfo', send)
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
                        title='CEP'
                        ref={cepInput}
                        placeholder='44444-444'
                        autoCorrect={false}
                        value={cep}
                        onChangeText={setCep}
                        iconName={'home'}
                        keyboardType="numeric"
                    />
                    <Input
                        title='Rua'
                        ref={lograInput}
                        placeholder='Rua'
                        autoCorrect={false}
                        value={logradouro}
                        onChangeText={setLogradrouro}
                        iconName={'home'}
                    />
                    <Input
                        title='Bairro'
                        ref={bairroInput}
                        placeholder='Bairro'
                        autoCorrect={false}
                        value={bairro}
                        onChangeText={setBairro}
                        iconName={'home'}
                    />
                    <Input
                        title='Número'
                        ref={numInput}
                        placeholder='Número'
                        autoCorrect={false}
                        value={numero}
                        onChangeText={setNumero}
                        iconName={'home'}
                    />
                    <Input
                        title='Complemento'
                        placeholder='Complemento'
                        autoCorrect={false}
                        value={complemento}
                        onChangeText={setComplemento}
                        iconName={'home'}
                    />
                    <Input
                        title='Cidade'
                        ref={localInput}
                        placeholder='Cidade'
                        autoCorrect={false}
                        value={localidade}
                        onChangeText={setLocalidade}
                        iconName={'home'}
                    />
                    <Input
                        title='Estado'
                        ref={UFInput}
                        placeholder='UF'
                        autoCorrect={false}
                        value={UF}
                        onChangeText={setUF}
                        iconName={'home'}
                    />
                    <TouchableOpacity
                        onPress={next}
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

export default AddressInfo;