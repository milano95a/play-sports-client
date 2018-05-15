import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import StadiumDetail from './StadiumDetail';
import { Header } from './../components/common';
import BookScreen from './../screens/BookScreen';

// make
class StadiumList extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  state = { stadiums: [], selectedStadium: '' };

  componentWillMount() {
    firebase.database().ref('/stadiums/').on('value', (snapshot) => {
      snapshot.forEach((s2) => {
        this.setState({ stadiums: [...this.state.stadiums, s2.val()] });
        // console.log(this.state.stadiums);
      });
    }, (e) => {
      console.log(e);
    });
  }

  renderAlbums() {
    // return <StadiumDetail stadium={this.stadium} />;
    return (
      this.state.stadiums
        .map((stadium) => (
          <TouchableOpacity
            key={stadium.stadiumKey}
            onPress={() => {
              this.props.navigation.navigate(
                'BookScreen',
                { stadium }
              );
            }}
          >
            <StadiumDetail key={stadium.stadiumKey} stadium={stadium} />
          </TouchableOpacity>
        ))
    );
  }

  render() {
    console.log('render');

    if (this.state.selectedStadium !== '') {
      return (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => { this.setState({ selectedStadium: '' }); }}
          >
            <Header>Book</Header>
          </TouchableOpacity>

          <BookScreen stadium={this.state.selectedStadium} />
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Header>My Stadiums</Header>
        {this.renderAlbums()}
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

export default StadiumList;
