import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const TimeButton = ({ onPress, children, style, textStyle }) => (
  <View style={{ marginTop:5, flexDirection: 'row' }}>
    <TouchableOpacity onPress={onPress} style={{ ...styles.buttonStyle, ...style }}>
      <Text style={{ ...styles.textStyle, ...textStyle }}>
        {children}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  textStyle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft:15,
    paddingTop: 15,
    paddingBottom: 15,
    color: '#2CB24A'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#2CB24A',
    // borderRadius:35,
    backgroundColor: 'transparent'
  },
};

export { TimeButton };
