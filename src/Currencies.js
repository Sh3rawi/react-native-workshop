import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  Button,
  ToastAndroid,
  AlertIOS,
  ListView,
} from 'react-native';

import {logout} from '../helpers/navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Currencies extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.onRowPress = this.onRowPress.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'All Cryptos',
      headerRight: (
        <Button
          onPress={() => logout(navigation)}
          title='Signout'
          color='red'
        />
      ),
    }
  };

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/`).then(data => {
      this.setState({data: JSON.parse(data._bodyInit)});
    });
  }

  onRowPress(item) {
    const {navigation} = this.props;
    navigation.navigate('Currency', {currency: item});
  }

  renderRow(item) {
    const {name, symbol, rank} = item;
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.row}
        onPress={() => this.onRowPress(item)}
      >
        <Text style={styles.info}>{`Name: ${name} (${symbol})`}</Text>
        <Text style={styles.info}>{`Rank: ${rank}`}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Welcome ${params.user}`}
        </Text>
        <ListView
          dataSource={ds.cloneWithRows(this.state.data)}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    paddingVertical: 5,
  },
  welcome: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  info: {
    alignSelf: 'center',
    fontSize: 15,
  },
});
