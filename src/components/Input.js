import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

const { width } = Dimensions.get('window');

const Input = ({
  placeholder,
  type,
  secureTextEntry = false,
  onChangeText,
  signingIn,
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize="none"
    autoCorrect={false}
    onChangeText={(v) => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#606060"
    selectionColor={'#606060'}
    editable={!signingIn}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#606060',
  },
});

export default Input;
