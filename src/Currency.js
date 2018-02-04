import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

export default class Currency extends Component<{}> {
  static navigationOptions = ({navigation}) => {
    const {currency} = navigation.state.params;
    return {
      title: `${currency.name} (${currency.symbol})`,
    }
  };

  render() {
    const {currency} = this.props.navigation.state.params;
    console.log(currency);
    const {rank, price_usd, price_btc, available_supply,
      total_supply, max_supply} = currency;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {`Rank: ${rank}`}
        </Text>
        <Text style={styles.text}>
          {`Current Price: $${price_usd}`}
        </Text>
        {currency.symbol !== 'BTC' &&
            <Text style={styles.text}>
              {`Price against BTC: ${price_btc}`}
            </Text>
        }
        <Text style={styles.text}>
          {`Available Supply: ${available_supply}`}
        </Text>
        <Text style={styles.text}>
          {`Total Supply: ${total_supply}`}
        </Text>
        <Text style={styles.text}>
          {`Maximum Supply: ${max_supply ? max_supply : 'No Maximum Supply'}`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  text: {
    alignSelf: 'center',
    fontSize: 15,
    paddingVertical: 5,
  },
});
