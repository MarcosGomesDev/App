
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, TouchableWithoutFeedback,
Animated, Easing} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useDispatch, useSelector} from 'react-redux'
import {hideToast} from '../../store/modules/toast/actions'
import { heightPercent } from '../../utils/dimensions';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

var timer = null

const Toast = () => {
    const colors = {
        success: Colors.green,
        warn: Colors.warning,
        error: Colors.danger,
        default: Colors.default
    }
    const [pos] = useState(new Animated.Value(-(getStatusBarHeight() + heightPercent(3))))
    const dispatch = useDispatch()
    const toastfy = useSelector((state) => state.toast)

    const [styleStatusBar, setStyleStatusBar] = useState('light-content')
    
    useEffect(() => {
        toastfy.show && show()
    },[toastfy])

    const show = () => {
        clearTimeout(timer)
        Animated.timing(pos, {
            toValue: 0,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start()
        timer = setTimeout(() => {
            hide()
        }, toastfy.duration)
    }

    function hide() {
        Animated.timing(pos, {
            toValue: -(getStatusBarHeight() + heightPercent(3)),
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => {
            dispatch(hideToast())
        })
    }

    return (
        <View style={{zIndex: 100, elevation: 100}}>
            <StatusBar
                barStyle={styleStatusBar}
                backgroundColor={colors[toastfy.type]}
                translucent={true}
            />
            <TouchableWithoutFeedback
                onPress={() => {
                    clearTimeout(timer)
                    hide()
                }}
            >
                <Animated.View
                    onPress={() => hide()}
                    style={[
                        styles.default,
                        {
                            backgroundColor: colors[toastfy.type],
                            transform: [{translateY: pos}],
                        }
                ]}>
                    <View style={styles.messageContainer}>
                        {
                            toastfy.iconName !== '' && (
                                <Icon name={toastfy.iconName} size={20} color={Colors.white} />
                            )
                        }
                        <Text style={styles.messageText}>{toastfy?.message}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    default: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 7,
        paddingBottom: 20,
        paddingTop: getStatusBarHeight() + heightPercent(3),
        alignSelf: 'center',
        justifyContent: 'center',

    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        width: '100%',
    },
    messageText: {
        color: Colors.white,
        fontSize: 14,
        marginHorizontal: 10
    }
});

export default Toast;