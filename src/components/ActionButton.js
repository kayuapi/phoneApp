import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const ActionButton = ({ onPress, title, signingIn }) => (
  <TouchableHighlight
    onPress={onPress}
    disabled={signingIn}
    style={signingIn ? styles.disabledButtonContainer : styles.buttonContainer}
    underlayColor="#7b7b7b">
    <View style={styles.button}>
      {signingIn ? (
        <Text style={styles.buttonText}>Signing In ...</Text>
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#575757',
    borderRadius: 25,
  },
  disabledButtonContainer: {
    backgroundColor: '#000',
    borderRadius: 25,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SourceSansPro-SemiBold',
  },
});

export default ActionButton;
