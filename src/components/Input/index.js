import React, {useState, forwardRef, useImperativeHandle, createRef, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'

import { widthPercent, heightPercent } from '../../utils/dimensions'

const Input = forwardRef((props, ref) => {
    const [secureEntry, setSecureEntry] = useState(props.secureTextEntry)
    const [error, setError] = useState(false)
    let toastfy = useSelector((state) => state.toast)
    const inputRef = createRef()

    useImperativeHandle(ref, () => ({
        focusOnError() {
            setError(true)
            inputRef.current.focus()
        },
        resetError() {
            setError(false)
        }
    }))

    useEffect(() => {
        toastfy.show
    }, [toastfy])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={[
                styles.inputContainer,
                {
                    borderBottomColor: toastfy.show ? Colors.danger : Colors.primary,
                }
            ]}>
                <View style={{justifyContent: 'center'}}>
                    <Icon
                        name={props.iconName}
                        size={24}
                        color={toastfy.show ? Colors.danger : Colors.primary}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#a9a9a9"
                    {...props}
                    secureTextEntry={secureEntry}
                />
                {props.secureTextEntry && (
                    <TouchableOpacity
                        style={{alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => {
                            setSecureEntry(!secureEntry)
                        }}
                    >
                        <Icon 
                            name={secureEntry ? 'visibility' : 'visibility-off'} 
                            size={24}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        marginTop: heightPercent('5%'),
    },
    inputContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: Platform.OS === 'ios' ? 8 : 0,
        paddingHorizontal: 10,
        marginTop: 5,
        width: widthPercent('80%'),
    },
    titleContainer: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    title: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 15,
        paddingLeft: 10,
        color: Colors.primary,
        flex: 1,
    },
});

export default Input