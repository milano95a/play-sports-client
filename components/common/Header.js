// import
import React from 'react';
import { Text, View } from 'react-native';
// import { Constants } from 'expo';

// make
const Header = (props) => (
  // this.renderHeader();
  <View style={styles.viewStyle}>
    <Text style={styles.textStyle} >{props.children}</Text>
  </View>
);

const styles = {
  textStyle: {
    fontSize: 24,
    color: '#fff',
  },
  viewStyle: {
    marginTop: 24,
    backgroundColor: '#007aff',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
};
// export
export { Header };
