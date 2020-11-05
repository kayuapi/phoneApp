import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  // const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0.75)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 2,
      duration: 2500,
      useNativeDriver: true,
    }).start();
    // setTimeout(() => {
    //   navigation.navigate('Auth');
    // }, 2500);
  }, [animatedValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, { transform: [{ scale: animatedValue }] }]}
        resizeMode="contain"
        source={require('../../assets/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 50,
  },
});

export default SignIn;
