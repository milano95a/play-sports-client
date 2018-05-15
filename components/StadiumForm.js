import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import firebase from 'firebase';
import { Input, Button, Card, CardSection, Spinner } from './common';

class StadiumForm extends Component {

  state = {
    addStadiumLoading: false,
    addStadiumError: '',
    stadiumName: '',
    region: '',
    dist: '',
    price: '',
    lat: '41.296670',
    long: '69.245010',
    openDaysFrom: '',
    openDaysTo: '',
    openHoursFrom: '',
    openHoursTo: ''
  };

  resetFields() {
    this.setState({
      addStadiumLoading: false,
      addStadiumError: '',
      stadiumName: '',
      region: '',
      dist: '',
      price: '',
      lat: '41.296670',
      long: '69.245010',
      openDaysFrom: '',
      openDaysTo: '',
      openHoursFrom: '',
      openHoursTo: ''
    });
  }

  addStadium() {
    this.setState({ addStadiumLoading: true });

    const {
      stadiumName,
      region,
      dist,
      price,
      lat,
      long,
      openDaysFrom,
      openDaysTo,
      openHoursFrom,
      openHoursTo
    } = this.state;

    const userId = firebase.auth().currentUser.uid;

    const stadiumKey = firebase.database().ref('/stadiums').push().key;

    const stadium = {
      userId,
      stadiumKey,
      stadiumName,
      region,
      dist,
      price,
      lat,
      long,
      openDaysFrom,
      openDaysTo,
      openHoursFrom,
      openHoursTo
    };


    firebase.database().ref('/stadiums').child(stadiumKey).set(stadium)
    .then(() => {
      this.resetFields();
    })
    .catch((e) => {
      this.setState({ addStadiumLoading: false, addStadiumError: e.message });
      console.log(e);
    });
  }

  renderButtonOrSpinner() {
    if (this.state.addStadiumLoading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.addStadium.bind(this)}>
        Book
      </Button>
    );
  }

  renderSignUpForm() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Stadium"
            placeholder="name"
            value={this.state.stadiumName}
            onChangeText={stadiumName => this.setState({ stadiumName })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Region"
            placeholder="Tashkent"
            value={this.state.region}
            onChangeText={region => this.setState({ region })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="District"
            placeholder="Mirobod"
            value={this.state.dist}
            onChangeText={dist => this.setState({ dist })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={() => {}}>
            Location
          </Button>
        </CardSection>

        <CardSection>
          <Input
            label="Price p/h"
            placeholder="50,000"
            keyboardType="numeric"
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
          />
        </CardSection>

        <CardSection>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.openDaysFrom}
              onValueChange={(itemValue, itemIndex) => this.setState({ openDaysFrom: itemValue })}
            >
                <Picker.Item label="Open Days From" value="" />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednsday" value="Wednsday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
          </View>
        </CardSection>

        <CardSection>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.openDaysTo}
              onValueChange={(itemValue, itemIndex) => this.setState({ openDaysTo: itemValue })}
            >
              <Picker.Item label="Open Days To" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednsday" value="Wednsday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
          </View>
        </CardSection>

        <CardSection>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.openHoursFrom}
              onValueChange={(itemValue, itemIndex) => this.setState({ openHoursFrom: itemValue })}
            >
              <Picker.Item label="Open hours from" value="" />
              <Picker.Item label="7:00" value="7" />
              <Picker.Item label="8:00" value="8" />
              <Picker.Item label="9:00" value="9" />
              <Picker.Item label="10:00" value="10" />
              <Picker.Item label="11:00" value="11" />
              <Picker.Item label="12:00" value="12" />
              <Picker.Item label="13:00" value="13" />
              <Picker.Item label="14:00" value="14" />
              <Picker.Item label="15:00" value="15" />
              <Picker.Item label="16:00" value="16" />
              <Picker.Item label="17:00" value="17" />
              <Picker.Item label="18:00" value="18" />
              <Picker.Item label="19:00" value="19" />
              <Picker.Item label="20:00" value="20" />
              <Picker.Item label="21:00" value="21" />
              <Picker.Item label="22:00" value="22" />
              <Picker.Item label="23:00" value="23" />
              <Picker.Item label="00:00" value="00" />
            </Picker>
          </View>
        </CardSection>

        <CardSection>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.openHoursTo}
              onValueChange={(itemValue, itemIndex) => this.setState({ openHoursTo: itemValue })}
            >
              <Picker.Item label="Open hours to" value="" />
              <Picker.Item label="7:00" value="7" />
              <Picker.Item label="8:00" value="8" />
              <Picker.Item label="9:00" value="9" />
              <Picker.Item label="10:00" value="10" />
              <Picker.Item label="11:00" value="11" />
              <Picker.Item label="12:00" value="12" />
              <Picker.Item label="13:00" value="13" />
              <Picker.Item label="14:00" value="14" />
              <Picker.Item label="15:00" value="15" />
              <Picker.Item label="16:00" value="16" />
              <Picker.Item label="17:00" value="17" />
              <Picker.Item label="18:00" value="18" />
              <Picker.Item label="19:00" value="19" />
              <Picker.Item label="20:00" value="20" />
              <Picker.Item label="21:00" value="21" />
              <Picker.Item label="22:00" value="22" />
              <Picker.Item label="23:00" value="23" />
              <Picker.Item label="00:00" value="00" />
            </Picker>
          </View>
        </CardSection>

        <Text style={styles.errorStyle}>
          {this.state.addStadiumError}
        </Text>
        <CardSection>
          {this.renderButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }

  render() {
    return this.renderSignUpForm();
  }
}

const styles = {
  pickerStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  textInfoStyle: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 8
  },
    errorStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red',
      marginLeft: 8,
      marginRight: 8
    },
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
      backgroundColor: '#007aff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 8,
      borderColor: '#fff',
    },
    buttonStyleOff: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#007aff',
      alignItems: 'center',
      justifyContent: 'center',
    }
};

export default StadiumForm;
