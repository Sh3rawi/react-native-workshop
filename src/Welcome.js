import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  Button,
  ToastAndroid,
  AlertIOS,
} from 'react-native';

import {resetForCurrencies} from '../helpers/navigation';

export default class Welcome extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      newUser: '',
      newPass: '',
    };
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {
    const {navigation} = this.props;
    AsyncStorage.getItem('loggedIn').then(user => {
      if (user) {
        resetForCurrencies(navigation, user);
      }
    });
  }

  alert(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    } else {
      AlertIOS.alert(msg);
    }
  }

  login() {
    const {navigation} = this.props;
    AsyncStorage.getItem('users').then(data => {
      const {username, password} = this.state;
      let users = JSON.parse(data || '{}');
      if (!users[username] || users[username].password !== password) {
        this.alert('Wrong user or password');
      } else {
        AsyncStorage.setItem('loggedIn', username).then(() => {
          resetForCurrencies(navigation, username);
        });
      }
    });
  }

  signUp() {
    const {navigation} = this.props;
    AsyncStorage.getItem('users').then(data => {
      let users = JSON.parse(data || '{}');
      const {newUser, newPass} = this.state;
      if (!newUser || !newPass) {
        this.alert('Please Complete all fields');
      } else if (users[newUser]) {
        this.alert('User already taken');
      } else {
        users[newUser] = {password: newPass};
        AsyncStorage.multiSet([['users', JSON.stringify(users)], ['loggedIn', newUser]]).then(() => {
          resetForCurrencies(navigation, newUser);
        });
      }
    });
  }

  renderLogin() {
    return (
      <View>
        <Text style={styles.text}>
          Login
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Username'
          value={this.state.username}
          onChangeText={text => this.setState({username: text})}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
          secureTextEntry
        />
        <Button
          title='Login!'
          color='green'
          onPress={this.login}
        />
      </View>
    );
  }

  renderSignup() {
    return (
      <View style={styles.signUp}>
        <Text style={styles.text}>
          New User? Signup
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Username'
          value={this.state.newUser}
          onChangeText={text => this.setState({newUser: text})}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          value={this.state.newPass}
          onChangeText={text => this.setState({newPass: text})}
          secureTextEntry
        />
        <Button
          title='Signup!'
          color='blue'
          onPress={this.signUp}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../img/blockchain.png')}
          style={styles.logo}
        />
        {this.renderLogin()}
        {this.renderSignup()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    height: 130,
    width: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  signUp: {
    marginTop: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
  },
  textInput: {
    ...Platform.select({
      ios: {height: 30},
      android: {height: 60},
    }),
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
});
