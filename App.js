import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image,Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';

import LandingScreen from './src/Landing';
import ProfileScreen from './src/Profile';

const stackNavigator = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
      navigationOptions: () => ({
        title: null,
        headerShown: false,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        title: null,
        headerShown: false,
      }),
    },
  }
);

export default createAppContainer(stackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 18,
    height: 25,
    marginBottom:10
  },
  iconRow: {
    height: 44,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 0,
    marginBottom:5,
  },
  iconRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 15
  },
  icon2: {
    color: "rgba(250,250,250,1)",
    fontSize: 25
  }
});
