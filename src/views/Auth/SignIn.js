import React, { Component } from 'react';
import { View } from 'react-native';

import { Auth } from 'aws-amplify';

import { Input, ActionButton } from '../../components';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    signingIn: false,
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  signIn = async () => {
    const { username, password } = this.state;
    try {
      this.setState({ signingIn: true });
      await Auth.signIn(username, password);
      console.log('successfully signed in');
      this.setState({ signingIn: false });
      this.props.updateAuth('Home');
      // this.props.goTo('OrderStack');
    } catch (err) {
      this.setState({ signingIn: false });
      this.props.updateError(err.message);
      console.log('error signing in...', err);
    }
  };
  showForgotPassword = () => {
    this.props.toggleAuthType('showForgotPassword');
  };
  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          type="username"
          placeholder="Username"
          signingIn={this.state.signingIn}
        />
        <Input
          onChangeText={this.onChangeText}
          type="password"
          placeholder="Password"
          secureTextEntry
          signingIn={this.state.signingIn}
        />
        <ActionButton
          title="Sign In"
          onPress={this.signIn}
          signingIn={this.state.signingIn}
        />
      </View>
    );
  }
}

export default SignIn;
