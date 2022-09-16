import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../../../styles/Colors';

const DescriptionInput = ({value, onChangeTextValue}) => {
    const [height, setHeight] = useState(42)
    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>
                Descrição do produto
            </Text>
            <TextInput
                placeholder="Bolo de cenoura"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={(text) => onChangeTextValue(text)}
                style={[styles.input, {height: height}]}
                maxLength={144}
                multiline={true}
                onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        marginBottom: 15
    },
    titleInput: {
        marginBottom: 5,
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

export default DescriptionInput;