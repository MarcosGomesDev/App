import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, SafeAreaView,
TouchableOpacity, Text, Image} from 'react-native';
import Colors from '../../styles/Colors';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ImagesModal = ({isVisible, image, onDeleteImage, onEditImage, onCancel}) => {
    
    return (
        <Modal
            transparent={true}
            isVisible={isVisible}
            customBackdrop={
                <TouchableWithoutFeedback
                    onPress={onCancel}
                >
                    <View style={{flex: 1, backgroundColor: "#000"}} />
                </TouchableWithoutFeedback>
            }
            style={{marginHorizontal: 0, marginBottom: 0}}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.headerModal}>
                <Text style={styles.title}>
                        Imagem do produto
                    </Text>
                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={onCancel}
                    >
                        <Icon name="close" size={36} color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.modalContent}
                >
                    <Image
                        source={{uri: image.toString()}}
                        style={{width: 500, height: 500}}
                    />
                    
                </View>
                <View style={styles.bottomModal}>
                    <TouchableOpacity
                        onPress={onDeleteImage}
                        style={[styles.bottomBtns, {backgroundColor: '#ff0000'}]}
                    >
                        <Icon name="delete" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onEditImage}
                        style={[styles.bottomBtns, {backgroundColor: '#808080'}]}
                    >
                        <Icon name="edit" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 60,
        marginHorizontal: 0,
        paddingHorizontal: 0
    },
    headerModal: {
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: '#FFF',
        borderBottomWidth: 0.3,
        borderBottomColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        color: Colors.primary,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },
    closeModal: {
    },
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        bottom: 30,
        paddingHorizontal: 20
    },
    bottomBtns: {
        width: 50,
        height: 50,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ImagesModal;