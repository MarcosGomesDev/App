import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet,
Text, Image, ActivityIndicator, Modal } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import {getData} from '../../utils/storage'
import {showToast} from '../../store/modules/toast/actions'
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';

import api from '../../services/api'
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'
import { useLogin } from '../../context/LoginProvider';

const Profile = (props) => {
    const {profile} = useLogin()
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [avatar, setAvatar] = useState([])
    const [loading, setLoading] = useState(false)

    const options = {
        selectionLimit: 1,
        mediaType: 'photo',
    }

    const handleImageUser = async() => {
        
        const data = await ImagePicker.launchImageLibrary(options)
        if(data.didCancel){
            return
        }
        if(data.error){
            return
        }
        if(!data.assets[0].uri){
            return
        }
        
        const image = data.assets

        const avatar = []

        for(let i = 0; i < image.length; i++){
            avatar.push({
                uri: image[i].uri,
                type: image[i].type,
                name: image[i].fileName
            })
        }

        setAvatar(avatar)
    }

    const uploadImage = async () => {
        let formdata = new FormData()
    
        formdata.append('avatar', {
            name: new Date() + '_avatar',
            uri: avatar[0].uri,
            type: avatar[0].type
        })

        const response = await fetch(PROCESS.env.URL + '/user/upload-profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${profile.token}`
            },
            body: formdata
        })
        
        const data = await response.json()
        if(response.status === 201){
            setModalVisible(false)
            dispatch(showToast(data, 'success', 'done'))
        } else {
            setModalVisible(false)
            dispatch(showToast(data, 'error', 'error'))
        }
    }

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 20}}
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Minha conta
                </Text>
            </View>
            <ScrollView>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: profile.avatar}}
                        />
                        <Icon
                            style={styles.editIcon}
                            name="add-a-photo" size={24}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                    <Text style={styles.username}>
                        {profile.name}
                    </Text>
                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={() => setModalVisible(false)}
                        >
                            <Icon name="close" size={30} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image
                            style={[styles.profileImage, {alignSelf: 'center', marginVertical: 20}]}
                            source={avatar !== '' ? avatar : {uri: profile.avatar}}
                            />
                        <TouchableOpacity
                            onPress={() => handleImageUser()}
                            style={{paddingHorizontal: 20, paddingVertical: 15, alignSelf: 'center',
                            backgroundColor: Colors.primary, borderRadius: 5, marginVertical: 20, borderRadius: 15}}
                        >
                            <Text style={[styles.btnTextModal, {fontSize: 14}]}>
                                Selecionar imagem
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => uploadImage()}
                            style={styles.btnModal}
                        >
                            <Text style={styles.btnTextModal}>
                                {loading ? <ActivityIndicator size='small' color={Colors.white} /> : 'Salvar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1,
    },
    title: {
        width: '65%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.primary
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginBottom: 10
    },
    editIcon: {
        position: 'absolute',
        right: -4,
        bottom: 15
    },
    username: {
        fontSize: 15,
        color: Colors.primary,
        fontWeight: 'bold'
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
    },
    closeModal: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    btnModal: {
        paddingVertical: 22,
        paddingHorizontal: 120,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    btnTextModal: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600'
    }
});

export default Profile;