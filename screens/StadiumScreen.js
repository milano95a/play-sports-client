import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';
import firebase from 'firebase';
import MapView from 'react-native-maps';
import { List, ListItem, Badge, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class StadiumScreen extends React.Component {

  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  static navigationOptions = {
    drawerLabel: 'Stadiums',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../assets/field.png')}
        style={[styles.icon, {tintColor}]}
      />
    ),
  };


  componentWillMount() {
    console.log('componentWillMount');

    firebase.database().ref('/stadiums/').once('value', (snapshot) => {
      snapshot.forEach((s2) => {
        this.setState({ stadiums: [...this.state.stadiums, s2.val()] });
      });
    }, (e) => {
      console.log(e);
    });
  }

  state = {
      stadiums: [],
      selectedStadium: null,
      selectStadiumButtonText: 'Select stadium',
      dataSource: [],
      map: false,
  };

  renderMapMarkers(){
    return this.state.stadiums.map((stadium) => (
      <MapView.Marker
        image={require('./../assets/stadium.png')}
        key={stadium.location.latitude + stadium.location.longitude}
        coordinate={{
          latitude: stadium.location.latitude,
          longitude: stadium.location.longitude
        }}
        title={stadium.stadiumName}
        description={`${stadium.price} sums`}
        onCalloutPress={()=>{
          this.props.navigation.navigate(
            'BookScreen',
            {stadium}
          );
        }}
      />
    ));
  }

  renderMapControls(){
    return (
        <Icon
          raised
          name='format-list-bulleted'
          type='material-community'
          color='white'
          underlayColor={Colors.blue}
          containerStyle={{ backgroundColor: Colors.blue}}
          onPress={() => this.setState({map: false})}
        />
    );
  }

  renderMapContent(){
    const mapMarkers = this.renderMapMarkers();

    return this.state.stadiums != null
    ? (
        <MapView
          style={styles.map}
          region={{
            latitude: 41.296299,
            longitude: 69.268930,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }} >
          {mapMarkers}
        </MapView>
    ) : (
        <MapView
            style={styles.map}
            region={{
              latitude: 41.296299,
              longitude: 69.268930,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }} >
            {mapMarkers}
        </MapView>
    );
  }

  renderMap(){
    const content = this.renderMapContent();
    const controls = this.renderMapControls();

    return (
      <View style={styles.mapContainer}>
        {content}
        {controls}
      </View>
    );
  }

  renderList(){
    const list = this.state.stadiums === undefined
    ? (null)
    : this.state.stadiums.map((stadium, i) =>{
      if (stadium.status === true){
        return (
          <ListItem
          key={i}
          avatarStyle={{backgroundColor: 'white'}}
          title={stadium.stadiumName}
          subtitle={
            <View style={styles.subtitleView}>
            <Text style={styles.ratingText}>{`${stadium.region}, ${stadium.dist}`}</Text>
            <Badge containerStyle={{ marginLeft: 10, backgroundColor: Colors.red}}>
            <Text style={styles.ratingImage}>{`${stadium.price} sums`}</Text>
            </Badge>
            </View>
          }
          avatar={require('./../assets/field.png')}
          component={TouchableHighlight}
          underlayColor={Colors.lightBlue}
          onPress={() => {
            this.props.navigation.navigate(
              'StadiumDetailScreen',
              { stadium }
            );
          }}
          />
        );
      } else {
        return (null);
      }
    });
    return (
      <View style={styles.container}>
        <ScrollView >
          <List >
            {list}
          </List>
        </ScrollView>
        <View style={{alignItems: 'flex-end'}}>
          <Icon
            raised
            name='map'
            type='enctypo'
            color='white'
            underlayColor={Colors.blue}
            containerStyle={{ backgroundColor: Colors.blue}}
            onPress={() => this.setState({map: true})} />
        </View>
      </View>
    );
  }

  render() {
    if (this.state.map) {
      return this.renderMap();
    }

    return this.renderList();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
  subtitleView: {
    flexDirection: 'row',
  },
  ratingImage: {
    color: 'white',
    fontWeight: 'bold'
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    color: 'grey'
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonStyle: {
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
});
