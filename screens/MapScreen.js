import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from './../components/common';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Map Finder',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
