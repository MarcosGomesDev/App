
import React, { Component } from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

// create a component
const Settings = (props) => {
    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{padding: 20}} 
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </Container>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        elevation: 1,
        zIndex: 1
    }
});


export default Settings;
