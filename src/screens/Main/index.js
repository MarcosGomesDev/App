import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { widthPercent, heightPercent } from '../../utils/dimensions';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'
import SearchInput from '../../components/SearchInput'
import ProductList from '../../components/ProductList'

import { getData } from '../../utils/storage';

const Main = (props) => {

    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{paddingVertical: 20, paddingHorizontal: 10}} 
                    onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name="menu" size={26} color={Colors.primary} />
                </TouchableOpacity>
                <SearchInput />
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Favoritos')}
                    style={{paddingVertical: 20, paddingHorizontal: 10}}
                >
                    <Icon name="favorite-outline" size={26} color={Colors.primary} />
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