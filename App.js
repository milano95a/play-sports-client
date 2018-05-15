import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import firebase from 'firebase';
import { Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

import RootNavigation from './navigation/RootNavigation';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedin: null,
    headerText: 'Authentication',
    selectedStadium: ''
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyALa7aNfd_M_hpTdu3EaFYsdI3lkJv-OwY',
      authDomain: 'auth-dcd1e.firebaseapp.com',
      databaseURL: 'https://auth-dcd1e.firebaseio.com',
      projectId: 'auth-dcd1e',
      storageBucket: 'auth-dcd1e.appspot.com',
      messagingSenderId: '650984909341'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedin: true });
      } else {
        this.setState({ loggedin: false });
      }
    });
  }

  renderContent() {
    const numb = [1, 2, 3, 3];

      if (this.state.loggedin) {
          if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
              <AppLoading
                startAsync={this._loadResourcesAsync}
                onError={this._handleLoadingError}
                onFinish={this._handleFinishLoading}
              />
            );
          } else {
            return (
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                <RootNavigation data={numb}/>
              </View>
            );
          }
      } else if (this.state.loggedin === false) {
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <Header>{this.state.headerText}</Header>
            <LoginForm />
          </View>
        );
      }

      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          {/* <Header>{this.state.headerText}</Header> */}
          <Spinner style={{ flex: 1 }} />
        </View>
      );
  }

  render() {
    return this.renderContent();
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    backgroundColor: '#076BD8'
  },
});
