import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import BookScreen from './../screens/BookScreen';
import HomeScreen from '../screens/HomeScreen';
import StadiumScreen from '../screens/StadiumScreen';
import StadiumDetailScreen from '../screens/StadiumDetailScreen';

import Colors from './../constants/Colors';

// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const BookingStack = StackNavigator({
  Home: { screen: HomeScreen },
}, {
  navigationOptions:({navigation}) => ({
    title: 'My Bookings',
    headerLeft: <Icon name='menu' color='white' containerStyle={{marginLeft: 10}} underlayColor={Colors.lightBlue} size={30} onPress={()=> {navigation.navigate('DrawerOpen');}}/>,
    headerStyle: {
      backgroundColor: Colors.blue,
    },
    headerRight: <Icon
      name='logout'
      type='material-community'
      color='white'
      containerStyle={{marginRight: 10}}
      underlayColor={Colors.lightBlue}
      size={30}
      onPress={()=> {
        firebase.auth().signOut();
      }}/>,
    headerTintColor: '#fff',
  })
});

const StadiumStack = StackNavigator(
  {
    Stadiums: {
      screen: StadiumScreen,
      navigationOptions:({navigation}) => ({
        title: 'Stadiums',
        headerLeft: <Icon name='menu' color='white' containerStyle={{marginLeft: 10}} underlayColor={Colors.lightBlue} size={30} onPress={()=> {navigation.navigate('DrawerOpen');}}/>,
      })
     },
     StadiumDetailScreen: {
       screen: StadiumDetailScreen
     },
     BookScreen: {
       screen: BookScreen
     }
   },
   {
    navigationOptions:() => ({
      headerStyle: {
        backgroundColor: Colors.blue,
      },
      headerTintColor: '#fff',
    })
  }
);

const RootStackNavigator = DrawerNavigator(
  {
    Home: { screen: BookingStack },
    Stadiums: { screen: StadiumStack }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  });

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator data={this.props}/>;
  }
}
