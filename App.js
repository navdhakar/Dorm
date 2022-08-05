/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StatusBar, View, ImageBackground, StyleSheet, Text} from 'react-native';

import Router from './src/navigation/Router';

import HomeScreen from './src/screens/Home';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import { withAuthenticator } from 'aws-amplify-react-native';
GoogleSignin.configure({
  webClientId: '1055385059251-0da4aldl0jbgl60lg1sutkp01rnftvme.apps.googleusercontent.com',
});

const App =  () => {
  const [authstate, setauthstate] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const signIn = async () => {
    const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  setauthstate(true)
  return auth().signInWithCredential(googleCredential);
  };
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  if (!user) {
    return (
      <>

      <ImageBackground source={require("./assets/images/Dorm.png")} resizeMode="contain" style={styles.image}>
      <GoogleSigninButton
      style={{ width: 200, height: 60, marginBottom:30}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signIn}
      // disabled={this.state.isSigninInProgress}
    />
  
    </ImageBackground>
    </>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
      <Toast />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-end',
 
  },
 
});

export default App;
