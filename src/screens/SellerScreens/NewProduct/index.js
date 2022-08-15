
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, TextInput, 
StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import Container from '../../../components/Container';
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const fundo = 'https://res.cloudinary.com/gomesdev/image/upload/v1654276325/download_eaicvj.png'

const NewProduct = () => {
    const navigation = useNavigation()

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    // style={{paddingVertical: 20, paddingHorizontal: 10}}
                    onPress={navigation.goBack}
                >
                    <Icon name="arrow-back" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Criar Produto
                </Text>
            </View>
            <KeyboardAwareScrollView
                extraScrollHeight={20}
            >
            <ScrollView
                style={{padding: 10}}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.titleInput}>
                        Título do produto
                    </Text>
                    <TextInput
                        placeholder="Bolo de cenoura"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>
                        Preço do produto
                    </Text>
                    <TextInput
                        placeholder="R$ 30,00"
                        placeholderTextColor="#aaa"
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>
                        Título do produto
                    </Text>
                    <TextInput
                        placeholder="Bolo de cenoura"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>
                        Images
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{width: '33.33%', alignSelf: 'flex-start', marginHorizontal: 3}}
                        >
                            <Image style={styles.productImage} source={{uri: fundo}} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: '33.33%', alignSelf: 'center', marginHorizontal: 3}}
                        >
                            <Image style={styles.productImage} source={{uri: fundo}} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: '33.33%', alignSelf: 'flex-end', marginHorizontal: 3}}
                        >
                            <Image
                                style={styles.productImage}
                                source={{uri: fundo}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.textBtn}>Criar Produto</Text>
                </TouchableOpacity>
            </ScrollView>
            </KeyboardAwareScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
        marginBottom: 5
    },
    title: {
        width: '80%',
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    formContainer: {
        alignItems: 'center',
        margin: 10,
        marginBottom: 20
    },
    titleInput: {
        marginBottom: 10,
        textAlign: 'left',
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 10
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        width:"100%",
        marginBottom: 20,
        paddingBottom: 10,
        paddingLeft: 5,
        fontSize: 16,
        color: Colors.primary,
    },
    productImage: {
        width: '100%',
        height: 100,
    },
    btn: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NewProduct;