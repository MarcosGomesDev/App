import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryModal from '../../CategoryModal';
import Colors from '../../../styles/Colors'

const CategoryPicker = ({category, onChangeCategory}) => {
    const [modalVisible, setModalVisible] = useState(false)

    const onCategoryPress = item => {
        onChangeCategory(item)
        onClosePress()
    }

    const onClosePress = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>
                Categoria
            </Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => setModalVisible(true)}
            >
                <Text
                    style={styles.textBtn}
                >
                    {category || 'Selecione'}
                </Text>
            </TouchableOpacity>
            <CategoryModal
                isVisible={modalVisible}
                onConfirm={onCategoryPress}
                onCancel={onClosePress}
                onBackdropPress={onClosePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    titleInput: {
        marginBottom: 15,
        textAlign: 'left',
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    btn: {
        width: '100%',
        height: 55,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CategoryPicker;
