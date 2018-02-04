import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Welcome from './src/Welcome';
import Currencies from './src/Currencies';
import Currency from './src/Currency';

const RootNavigator = StackNavigator({
  Welcome: {
    screen: Welcome,
  },
  Currencies: {
    screen: Currencies,
  },
  Currency: {
    screen: Currency,
  },
}, {
  initialRouteName: 'Welcome',
});

export default class App extends Component<{}> {
  render() {
    return (
      <RootNavigator />
    );
  }
}
