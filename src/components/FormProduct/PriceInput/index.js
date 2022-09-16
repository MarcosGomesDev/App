import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';
import {TextInputMask} from 'react-native-masked-text';

const PriceInput = ({value, onChangeTextValue}) => {


  return (
    <View
      style={{width: '100%', marginTop: 20}}
    >
    <Text style={styles.titleInput}>
      Preço do produto
    </Text>
    <View style={styles.container}>
      <View
        style={styles.prefixPrice}
      >
        <Text style={styles.prefixPriceText}>R$</Text>
      </View>
      <TextInputMask
        style={styles.input}
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: '',
          suffixUnit: '',
        }}
        value={value}
        includeRawValueInChangeText={true}
        onChangeText={(maskedValue, rawValue) => {
          onChangeTextValue(maskedValue);
        }}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    marginBottom: 20
  },
  titleInput: {
    marginBottom: 5,
    textAlign: 'left',
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  prefixPrice: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 10
  },
  prefixPriceText: {
    fontSize: 18,
    color: Colors.primary,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'left',
    paddingLeft: 0,
    paddingRight: 20,
  },
});

export default PriceInput;
