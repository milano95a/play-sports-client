import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';

const StadiumDetail = ({ booking }) => {
  const { bookerId, bookingId, stadiumKey, date, hourFrom, hourTo } = booking;
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle
  } = styles;

  // booking = {
  //   userName: 'Jon Doe',
  //   phone: '+998909009090',
  //   date: '02-04-2018',
  //   from: '7:00',
  //   to: '9:00'
  // };
  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{bookerId}</Text>
          <Text>{bookingId}</Text>
          <Text>{date}</Text>
        </View>

      </CardSection>

      <CardSection>
        <Text>{hourFrom}</Text>
        <Text> --- </Text>
        <Text>{hourTo}</Text>
      </CardSection>

      <CardSection>
        <Button style={{ backgroundColor: '#FF4136' }}>Cancel</Button>        
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 64,
    width: 64
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default StadiumDetail;
