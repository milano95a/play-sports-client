import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Booking Page</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
