
import React, {useState, useEffect, createRef} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const MyComponent = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Buscar')}
            style={styles.container}
        >
            <Icon style={styles.searchIcon} name="search" size={20} color={Colors.primary} />
            <Text style={styles.textBtn}>Procurar por...</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 150
    },
    searchIcon: {
        fontWeight: 'bold',
        position: 'absolute',
        left: 15,
    },
    textBtn: {
        flex: 1,
        paddingLeft: 50,
        color: '#a9a9a9'
    }
});


export default MyComponent;
