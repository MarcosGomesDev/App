import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image,
PermissionsAndroid, Alert, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../styles/Colors';
import ImagesModal from '../../ImagesModal'
import * as ImagePicker from 'react-native-image-picker';

const ImagesPicker = ({values, onChangeImages}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [item, setItem] = useState({})
    
    const options = {
        selectionLimit: 1,
        mediaType: 'photo',
    }

    const deleteImage = (image) => {
        const index = values.indexOf(image)

        Alert.alert(
            'Remover',
            'Você deseja realmente remover essa imagem?',
            [
                {
                    text: 'cancelar',
                    onPress: () => {}
                },
                {
                    text: 'ok',
                    onPress: () => {
                        if(index > -1) {
                            values.splice(index, 1)

                            onChangeImages(values)
                        }
                        setModalVisible(false)
                    }
                }
            ]
        )
    }

    const editImage = async(image) => {
        const data = await ImagePicker.launchImageLibrary(options)
        if(data.didCancel){
            console.log('User cancelled image picker');
            return
        }
        if(data.error){
            return
        }
        if(!data.assets[0].uri){
            return
        }

        const newImage = data.assets

        const index = values.findIndex(item => {
            return item === image
        })

        if(index !== -1) {
            values[index] = newImage[0].uri
            setModalVisible(false)
        }
        onChangeImages(values)
    }

    const getImages = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Permissão para acessar suas fotos',
                message: 'O app precisa de acesso as suas fotos',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Ok'
            }
        )

        if(granted === PermissionsAndroid.RESULTS.GRANTED) {
            const data = await ImagePicker.launchImageLibrary(options)
            if(data.didCancel){
                console.log('User cancelled image picker');
                return
            }
            if(data.error){
                return
            }
            if(!data.assets[0].uri){
                return
            }
    
            const image = data.assets
    
            const final = []
    
            final.push({
                uri: image[0].uri,
                type: image[0].type
            })
    
            const send = values.concat(final)
    
            onChangeImages(send)
        } else {
            Alert.alert('Permissão a galeria negada')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>
                Images
            </Text>
            <View 
                style={[styles.sectionImagesContainer, 
                {justifyContent: values.length === 3 ? 'center' : null}]
            }>
                {values.map((item, index) => {
                    return(
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true)
                                setItem(item.uri || item)
                            }}
                            key={index}
                            style={[styles.imageBtn, {
                                width: values.length === 3 ? '30.3%' : '22%',
                                height: values.length === 3 ? 120 : 80
                            }]}
                        >
                            <Image
                                source={{uri: item.uri || item}}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    marginHorizontal: 5,
                                    borderRadius: 10
                                }}
                            />
                        </TouchableOpacity>
                    )}
                )}
                {values.length < 3 ? (
                    <TouchableOpacity
                    style={styles.addImagesBtn}
                    onPress={() => getImages()}
                >
                    <Icon
                        name="add"
                        size={32}
                        color={Colors.white}
                    />
                </TouchableOpacity>
                ) : (<></>)}
            </View>

            <ImagesModal
                isVisible={modalVisible}
                image={item}
                onEditImage={() => editImage(item)}
                onDeleteImage={() => deleteImage(item)}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    titleInput: {
        marginBottom: 20,
        textAlign: 'left',
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    btn: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    sectionImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 0
    },
    imageBtn: {
        marginHorizontal: 5,
        alignItems: 'center',
    },
    addImagesBtn: {
        width: 80,
        height: 80,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ImagesPicker;
