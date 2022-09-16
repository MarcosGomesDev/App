import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback,
SafeAreaView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionFooter, { ActionPrimaryButton } from '../../../../components/core/ActionFooter';
import Colors from '../../../../styles/Colors';

const ModalOptions = ({isVisible, onCancel, onPressEdit, onPressDelete}) => {
    return (
        <Modal
            isVisible={isVisible}
            animationType="slide"
            transparent={true}
            backdropOpacity={0.5}
            useNativeDriver={true}
            customBackdrop={
                <TouchableWithoutFeedback
                    onPress={onCancel}
                >
                    <View style={{flex: 1, backgroundColor: "#000"}} />
                </TouchableWithoutFeedback>
            }
        >
            <SafeAreaView style={styles.modalContainer}>
                <Text style={[styles.title, {margin: 15}]}>
                    Selecione uma das opções:
                </Text>
                <View style={styles.modalContent}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.titleOption}>
                            Editar
                        </Text>
                        <TouchableOpacity
                            onPress={onPressEdit}
                            style={[styles.btnModal, {backgroundColor: Colors.primary}]}
                        >
                            <Icon name="edit" size={28} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionContainer}>
                        <Text style={styles.titleOption}>
                            Excluir
                        </Text>
                        <TouchableOpacity
                            onPress={onPressDelete}
                            style={[styles.btnModal, {backgroundColor: Colors.danger}]}
                        >
                            <Icon name="delete" size={28} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ActionFooter>
                    <ActionPrimaryButton
                        title="Cancelar"
                        onPress={onCancel}
                    />
                </ActionFooter>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: Colors.white,
        height: 250,
        borderRadius: 20,
        alignItems: 'center'
    },
    title: {
        width: '80%',
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    optionContainer: {
        alignItems: 'center',
        width: '50%'
    },
    titleOption: {
        color: Colors.primary,
        fontSize: 18,
        paddingBottom: 10
    },
    btnModal: {
        width: 60,
        height: 60,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 15
    }
});

export default ModalOptions;
