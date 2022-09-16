import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import Container from '../../../components/core/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'
import SearchInput from '../../../components/SearchInput'
import ProductList from '../../../components/ProductList'

const Main = (props) => {

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{width: '12.5%', height: 30, alignItems: 'center', justifyContent: 'center'}} 
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={30} color={Colors.primary} />
                </TouchableOpacity>
                <SearchInput />
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Favoritos')}
                    style={{width: '12.5%', height: 34, alignItems: 'center', justifyContent: 'center'}}
                >
                    <Icon name="favorite-outline" size={34} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ProductList />
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 9,
        zIndex: 1,
        elevation: 1,
    }
});

export default Main;