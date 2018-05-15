import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableHighlight, View, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { List, ListItem, Badge } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {

  constructor() {
    super();

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  static navigationOptions = {
    drawerLabel: 'Bookings',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../assets/ball.png')}
        style={[styles.icon, {tintColor}]}
      />
    ),
    headerTintColor: '#fff',
  };

  state = { bookings: [] };

  componentWillMount() {
    const user = firebase.auth().currentUser;

    firebase.database().ref('/bookings/').once('value', (snapshot) => {
      snapshot.forEach((s2) => {
        // console.log(user.uid)

        // console.log(s2.val().bookerId);
        console.log(user.uid === s2.val().bookerId);
        if (user.uid === s2.val().bookerId){
          this.setState({ bookings: [...this.state.bookings, s2.val()] });
        }
      });
    }, (e) => {
      console.log(e);
    });
  }

  render() {
    // console.log('HomeScreen');
    // console.log(this.props);
    // console.log(this.state);
    const list = this.state.bookings === undefined
    ? (null)
    : this.state.bookings.map((booking, i) => {
      const time = parseInt(booking.time, 10);
      return (
        <ListItem
          key={i}
          avatarStyle={{backgroundColor: 'white'}}
          title={booking.stadium}

          subtitle={
            <View style={styles.subtitleViewContainer}>
              <View style={{flex: 1}}>


                <Text style={styles.ratingText}>{`Date: ${booking.date}`}</Text>

                <Text style={styles.ratingText}>{`Time: ${time}:00 - ${time + 1}:00`}</Text>
              </View>

              <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    // ref.child(key).remove();
                  firebase.database().ref('/bookings/').child(booking.bookingId).remove();
                    const l = this.state.bookings;
                    l.splice(i, 1);
                    this.setState({bookings: [...l]});
                  }}
                  style={{
                    borderRadius: 5,
                    flex: 1,
                    marginLeft: 15,
                    padding: 10,
                    backgroundColor: Colors.red,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          avatar={require('./../assets/ball.png')}
          component={TouchableHighlight}
          underlayColor={Colors.lightBlue}
          onPress={() => {
          }}
        />
      );
    });

    return (
      <ScrollView style={styles.container}>
        <List>{list}</List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyleOn: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 8,
    borderColor: '#fff',
  },
  buttonStyleOff: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleViewContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  subtitleView: {
    flexDirection: 'row',
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingTextBold: {
    fontWeight:'bold',
    color: 'white',
  },
  ratingText: {
    paddingTop: 5,
    color: 'grey'
  },
  ratingTextHeader: {
    fontWeight:'bold',
    paddingTop: 5,
    color: 'grey'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },

});
