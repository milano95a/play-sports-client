import React from 'react';
import { ScrollView, StyleSheet, Text, View, DatePickerAndroid } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Spinner } from './../components/common';
import Colors from '../constants/Colors';

export default class BookScreen extends React.Component {
  static navigationOptions = {
    title: 'Booking',
  };

  state = {
    price: this.props.navigation.state.params.stadium.price,
    stadiumKey: this.props.navigation.state.params.stadium.stadiumKey,
    date: 'Pick date',
    addBookError: '',
    addBookLoading: false,
    hourFrom: '',
    time: '',
    bookings: [],
    nonAvailableTimes: [],
    ownerId: '',
  };

  componentWillMount() {
    const bookingRef = firebase.database().ref('/bookings');

    bookingRef.orderByChild('stadiumKey').equalTo(this.state.stadiumKey).on('value', (snapshot) => {
      snapshot.forEach((child)=>{
        const bookings = this.state.bookings;
        bookings.push(child.val());
        this.setState({ bookings });
        // this.setState({ bookings: [...this.state.bookings, child.val()] });
      });
    }, (e) =>{
      console.log(e);
    });
  }

  resetFields() {
    this.setState({
      date: 'Pick date',
      addBookError: '',
      addBookMessage: '',
      addBookLoading: false,
      hourFrom: '',
      time: ''
    });
  }

  addBook() {
    const user = firebase.auth().currentUser;
    const fields = user.displayName.split('|');
    console.log(fields);

    this.setState({ addBookLoading: true });
    const bookingRef = firebase.database().ref('/bookings');


    const {
      stadiumKey,
      price,
      date,
      hourFrom,
      time,
    } = this.state;

    const bookerId = firebase.auth().currentUser.uid;

    const bookingId = bookingRef.push().key;

    // console.log('-----------------------------------------------');
    // console.log(this.props.navigation.state.params.stadium.userId);

    const book = {
      bookingId,
      bookerId,
      stadiumKey,
      date,
      hourFrom,
      time,
      price,
      booker: fields[0],
      phone: fields[1],
      stadium: this.props.navigation.state.params.stadium.stadiumName,
      ownerId: this.props.navigation.state.params.stadium.userId
    };


    bookingRef.child(bookingId).set(book)
    .then(() => {
      this.resetFields();
      this.setState({ addBookLoading: false, addBookMessage: 'Thank you for booking with us!' });
    })
    .catch((e) => {
      this.setState({ addBookLoading: false, addBookError: e.message });
      console.log(e);
    });
  }

  async renderDatePicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });

    if (action === DatePickerAndroid.dismissedAction) {
      return;
    }
    console.log(date);

    const date = month < 9 ? `${day}-0${month}-${year}` : `${day}-${month}-${year}`;
    const todaysBookings = this.state.bookings.filter((booking) => !booking.date.localeCompare(date));
    const nonAvailableTimes = [];

    todaysBookings.forEach((booking)=>{
      nonAvailableTimes.push(booking.time);
    });

    // console.log(date);
    // console.log(nonAvailableTimes);

    this.setState({ date, nonAvailableTimes, addBookMessage: '' });

    // do something with the year, month, and day here
  }

  renderButtonOrSpinner() {
    if (this.state.addBookLoading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.addBook.bind(this)}>
        Book
      </Button>
    );
  }

  renderHours(){
    // console.log(this.props.navigation.state.params.stadium.openDaysFrom);
    //
    // console.log(this.state.date);

    if (!this.state.date.localeCompare('Pick date')){
      return (null);
    }
    const clockButtons = [];
    for (let i = 9; i < 22; i++) {
      clockButtons.push(i);
    }

    const buttonComponents = clockButtons.map((value) => {
      // console.log(value);
      // console.log(this.state.nonAvailableTimes.includes(value));

      if (this.state.nonAvailableTimes.includes(`${value}`)){
        return (null);
      }
      if (!this.state.time.localeCompare(`${value}`)){
        // console.log(value);
        return (
          <Button
            key={value}
            onPress={()=> { this.setState({time: `${value}`}); }}
            style={{backgroundColor: Colors.green, marginTop: 8, elevation: 0, borderRadius: 35}}>
              {`${value}:00 - ${value + 1}:00`}
          </Button>);
      }
      return (
        <Button
          key={value}
          onPress={()=> { this.setState({time: `${value}`}); }}
          style={{backgroundColor: Colors.gray, marginTop: 8, elevation: 0, borderRadius: 35}}>
            {`${value}:00 - ${value + 1}:00`}
        </Button>);
    });

    return (
      <CardSection style={{flex: 1, flexDirection: 'column'}}>
        {buttonComponents}
      </CardSection>
    );
  }

  render() {
    // console.log('---------------------------');
    // const user = firebase.auth().currentUser;
    // console.log(user);

    const hours = this.renderHours();
    const { stadiumName, dist, price } = this.props.navigation.state.params.stadium;

    return (
      <ScrollView style={styles.container}>
        <Card>
          <CardSection>
            <View style={styles.headerContentStyle}>
              <Text style={styles.TextStyle}>Name: </Text>
              <Text style={styles.headerTextStyle}>{stadiumName}</Text>
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.headerContentStyle}>
              <Text style={styles.TextStyle}>Price: </Text>
              <Text style={styles.headerTextStyle}>{price}</Text>
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.headerContentStyle}>
              <Text style={styles.TextStyle}>Location: </Text>
              <Text style={styles.headerTextStyle}>{dist}</Text>
            </View>
          </CardSection>

          <CardSection>
            <Button
              onPress={() => {
                try {
                  this.renderDatePicker();
                } catch ({ code, message }) {
                  console.warn('Cannot open date picker', message);
                }
              }}
            >
              {this.state.date}
            </Button>
          </CardSection>

          <CardSection style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={styles.TextStyle}>Available hours</Text>
          </CardSection>

          {hours}

          <Text style={styles.errorStyle}>
            {this.state.addBookError}
          </Text>
          <Text style={styles.messageStyle}>
            {this.state.addBookMessage}
          </Text>
          <CardSection style={{ alignItems: 'center' }}>
            {this.renderButtonOrSpinner()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContentStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  headerTextStyle: {
    flex: 2,
    marginRight: 10,
    fontSize: 18
  },
  TextStyle: {
    flex: 1,
    color: '#999',
    marginRight: 10,
    fontSize: 18
  },
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    marginLeft: 8,
    marginRight: 8
  },
  messageStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.green,
    marginLeft: 8,
    marginRight: 8
  },
  pickerStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      // borderWidth: 2,
      // borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5
    },
});

// <CardSection>
//   <View style={styles.pickerStyle}>
//     <Picker
//       selectedValue={this.state.hourFrom}
//       onValueChange={(itemValue, itemIndex) => this.setState({ hourFrom: itemValue })}
//     >
//       <Picker.Item label="From" value="" />
//       <Picker.Item label="7:00" value="7" />
//       <Picker.Item label="8:00" value="8" />
//       <Picker.Item label="9:00" value="9" />
//       <Picker.Item label="10:00" value="10" />
//       <Picker.Item label="11:00" value="11" />
//       <Picker.Item label="12:00" value="12" />
//       <Picker.Item label="13:00" value="13" />
//       <Picker.Item label="14:00" value="14" />
//       <Picker.Item label="15:00" value="15" />
//       <Picker.Item label="16:00" value="16" />
//       <Picker.Item label="17:00" value="17" />
//       <Picker.Item label="18:00" value="18" />
//       <Picker.Item label="19:00" value="19" />
//       <Picker.Item label="20:00" value="20" />
//       <Picker.Item label="21:00" value="21" />
//       <Picker.Item label="22:00" value="22" />
//       <Picker.Item label="23:00" value="23" />
//       <Picker.Item label="00:00" value="00" />
//     </Picker>
//   </View>
// </CardSection>
//
// <CardSection>
//   <View style={styles.pickerStyle}>
//     <Picker
//       selectedValue={this.state.hourTo}
//       onValueChange={(itemValue, itemIndex) => this.setState({ hourTo: itemValue })}
//     >
//       <Picker.Item label="To" value="" />
//       <Picker.Item label="7:00" value="7" />
//       <Picker.Item label="8:00" value="8" />
//       <Picker.Item label="9:00" value="9" />
//       <Picker.Item label="10:00" value="10" />
//       <Picker.Item label="11:00" value="11" />
//       <Picker.Item label="12:00" value="12" />
//       <Picker.Item label="13:00" value="13" />
//       <Picker.Item label="14:00" value="14" />
//       <Picker.Item label="15:00" value="15" />
//       <Picker.Item label="16:00" value="16" />
//       <Picker.Item label="17:00" value="17" />
//       <Picker.Item label="18:00" value="18" />
//       <Picker.Item label="19:00" value="19" />
//       <Picker.Item label="20:00" value="20" />
//       <Picker.Item label="21:00" value="21" />
//       <Picker.Item label="22:00" value="22" />
//       <Picker.Item label="23:00" value="23" />
//       <Picker.Item label="00:00" value="00" />
//     </Picker>
//   </View>
// </CardSection>
