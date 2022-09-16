import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../../../styles/Colors';

const TitleInput = ({value, onChangeText}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>
                Título do produto
            </Text>
            <TextInput
                placeholder="Bolo de cenoura"
                placeholderTextColor="#aaa"
                value={value}
                style={styles.input}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
    },
    titleInput: {
        marginBottom: 5,
        marginTop: 15,
        textAlign: 'left',
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    input: {
        width:"100%",
        fontSize: 18,
        color: Colors.primary,
    },
});

export default TitleInput;