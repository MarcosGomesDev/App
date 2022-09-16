import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Colors from '../../../styles/Colors'

const ActionFooter = ({children, pdv, btw, btc}) => {
  return (
    <View style={[styles.container, {
      borderTopWidth: btw,
      borderTopColor: btc,
      paddingVertical: pdv,
    }]}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
};

export const ActionPrimaryButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ActionSecondaryButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    borderRadius: 150,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.primary,
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.tertiary,
  },
});

export default ActionFooter;
