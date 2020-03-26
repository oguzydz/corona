import React, { Component } from 'react';
import { StatusBar } from 'react-native'

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/components/TabNavigator'
import 'react-native-gesture-handler';
global.Buffer = global.Buffer || require('buffer').Buffer

import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

 
export default class App extends Component {

 
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor="white" barStyle="light-content" />
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}


