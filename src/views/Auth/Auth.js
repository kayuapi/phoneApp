import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const { width } = Dimensions.get('window');

class Auth extends React.Component {
  state = {
    showSignUp: false,
    formType: 'showSignIn',
    errorMsg: false,
  };
  toggleAuthType = (formType) => {
    this.setState({ formType });
  };
  handleContactUs = async (url) => {
    await Linking.openURL(url);
  };
  render() {
    const showSignIn = this.state.formType === 'showSignIn';
    const showSignUp = this.state.formType === 'showSignUp';
    const showForgotPassword = this.state.formType === 'showForgotPassword';
    const contactURL = 'https://m.me/chmbox';
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.Os === 'ios' ? 'padding' : 'height'}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/logo.png')}
        />
        <Text style={styles.title}>Chmbox</Text>
        <Text style={styles.subtitle}>v 1.0.9</Text>
        {showSignIn && (
          <SignIn
            toggleAuthType={this.toggleAuthType}
            updateAuth={() => this.props.updateAuth('home')}
            updateError={(errorMsg) => this.setState({ errorMsg })}
            // goTo={this.props.navigation.navigate}
          />
        )}
        {showSignUp && <SignUp toggleAuthType={this.toggleAuthType} />}
        {showForgotPassword && (
          <ForgotPassword toggleAuthType={this.toggleAuthType} />
        )}
        <View style={{ position: 'absolute', bottom: 60 }}>
          {showSignUp || showForgotPassword ? (
            <Text style={styles.bottomMessage}>
              Already signed up?{' '}
              <Text
                style={styles.bottomMessageHighlight}
                onPress={() => this.toggleAuthType('showSignIn')}>
                &nbsp;&nbsp;Sign In
              </Text>
            </Text>
          ) : (
            <Text style={styles.bottomMessage}>
              Need an account?
              <Text
                onPress={() => this.handleContactUs(contactURL)}
                style={styles.bottomMessageHighlight}>
                &nbsp;&nbsp;Contact us
              </Text>
            </Text>
          )}
        </View>
        <Snackbar
          visible={!!this.state.errorMsg}
          duration={500}
          style={{ backgroundColor: 'red' }}
          onDismiss={() => this.setState({ errorMsg: false })}>
          {this.state.errorMsg}
        </Snackbar>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    height: width / 2.5,
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
  },
  bottomMessageHighlight: {
    color: '#8a8a8a',
    paddingLeft: 10,
    fontWeight: '700',
  },
});

export default Auth;
