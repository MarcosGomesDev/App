import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, SafeAreaView,
TouchableOpacity, FlatList, Text, TextInput} from 'react-native';
import ActionFooter, {ActionPrimaryButton} from '../core/ActionFooter'
import Colors from '../../styles/Colors';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useCategories from '../../hooks/useCategories'

const CategoryModal = ({isVisible, onConfirm, onCancel}) => {
    const [categories] = useCategories()
    const [search, setSearch] = useState('')

    const filteredCategories = search.length > 0
        ? categories.filter(item => item.name.includes(search))
        : categories.sort(function (a, b) {
            if(a.name < b.name) return -1
        })
    
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
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Categorias
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="search" size={26} color={Colors.primary} />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        placeholder='Procurar por...'
                        placeholderTextColor="#a9a9a9"
                    />
                    {search.length > 0 ? 
                        <TouchableOpacity
                            style={{paddingRight: 10, height: 50, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => setSearch('')}
                        >
                            <Icon name="close" size={26} color={Colors.primary} />
                        </TouchableOpacity>
                    : <></>}
                </View>
                <FlatList
                    data={filteredCategories}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                onConfirm(item.name)
                                setSearch('')
                            }}
                        >
                            <Text style={styles.modalItemText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <ActionFooter
                    pdv={20}
                    btw={0.3}
                    btc={Colors.primary}
                >
                    <ActionPrimaryButton title="Cancelar" onPress={onCancel} />
                </ActionFooter>
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
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: Colors.primary
    },
    title: {
        color: Colors.primary,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderBottomWidth: 0.3,
        borderBottomColor: Colors.primary,
        alignItems: 'center',
    },
    input: {
        height: 50,
        color: Colors.primary,
        fontSize: 16,
        width: '85%',
    },
    searchIcon: {
        fontWeight: 'bold',
        position: 'absolute',
        left: 15,
    },
    textInput: {
        flex: 1,
        paddingLeft: 50,
        color: '#a9a9a9'
    },
    modalItem: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
    },
    modalItemText: {
        fontSize: 22,
        color: Colors.white,
        textAlign: 'center',
    },
});

export default CategoryModal;