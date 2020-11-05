import React from 'react';
import {View, Text, Button} from 'react-native';

const CreateNewPasswordScreen = ({ navigation }) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>CreateNewPasswordScreen</Text>
      <Button title="Log out" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default CreateNewPasswordScreen;
