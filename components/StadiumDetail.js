import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';
import Colors from './../constants/Colors';

class StadiumDetail extends React.Component {
  // state = { selectedStadium: '' };
  //
  // setSelectedState() {
  //   this.setState({ selectedStadium: this.props.stadium });
  //   console.log('state');
  //   console.log(this.state.selectedStadium);
  // }

  render() {
    const { stadiumName, dist, price } = this.props.stadium;

    const { thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      locationContainerStyle,
      viewContainerStyle,
      viewTextStyle
    } = styles;

    // if (this.state.selectedStadium === this.props.key) {
    //   return (
    //     <Card>
    //       <CardSection>
    //         <View style={headerContentStyle}>
    //           <Text style={headerTextStyle}>{stadiumName}</Text>
    //           <Text>{dist}</Text>
    //           <Text>{price}</Text>
    //         </View>
    //         </CardSection>
    //     </Card>
    //   )
    // }

    return (
      <Card>
        <CardSection>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{stadiumName}</Text>
            <Text>{dist}</Text>
            <Text>{price}</Text>
          </View>

          <View style={thumbnailContainerStyle}>
            {/* <TouchableOpacity
              style={viewContainerStyle}
            >
              <Text style={viewTextStyle}>View</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={locationContainerStyle}>
              <Image
                style={thumbnailStyle}
                source={require('./../assets/images/location.png')}
              />
            </TouchableOpacity>

          </View>
        </CardSection>
      </Card>
    );
  }
}

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
    height: 36,
    width: 36,
    margin: 8
  },
  locationContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 12
  },
  viewContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: 8,
    marginRight: 8
  },
  viewTextStyle: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: '600',
    color: Colors.white
  },
  thumbnailContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default StadiumDetail;
