import React from 'react';
import {View, Image, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'

import { useLogin } from '../../context/LoginProvider';
import Colors from '../../styles/Colors'
import { removeData } from '../../utils/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = (props) => {
    const {setIsLoggedIn, profile} = useLogin()
    
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userContent}>
                    <View style={{flexDirection: 'row', marginLeft: 25}}>
                        <Image style={styles.logo} source={{uri: profile.avatar}} />
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{profile.name}</Text>
                            <Text style={styles.userEmail}>{profile.email}</Text>
                        </View>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View
                style={{height: 60, paddingLeft: 20, borderTopWidth: 0.6, alignItems: 'center',
                borderTopColor: Colors.primary, flexDirection: 'row'}}
            >
                <Icon
                    name="logout"
                    size={24}
                    color={Colors.primary}
                    style={{}}
                />
                <TouchableOpacity
                    style={{
                    }}
                    onPress={() => {
                        removeData()
                        setIsLoggedIn(false)
                    }}
                >
                    <Text style={{color: '#656566', paddingLeft: 30}}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: Platform === 'ios' ? 0 : 20,
    },
    userContent: {
        flexDirection: 'row',
        paddingBottom: 20,
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.primary
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary
    },
    userDetails: {
        top: 6,
        paddingLeft: 20,
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
        color: Colors.primary
    },
    userEmail: {
        color: '#a9a9a9',
    },
});

export default CustomDrawer;