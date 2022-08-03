/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StatusBar, } from 'react-native';

import Router from './src/navigation/Router';

import HomeScreen from './src/screens/Home';
import auth from '@react-native-firebase/auth';

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
      <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      // disabled={this.state.isSigninInProgress}
    />
      </>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
    </>
  );
};

export default App;
