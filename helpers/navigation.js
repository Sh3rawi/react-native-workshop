import {AsyncStorage} from 'react-native';
import { NavigationActions } from 'react-navigation';

export function resetForCurrencies(navigation, user) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Currencies', params: {user}})],
  });
  navigation.dispatch(resetAction);
};

export function logout(navigation) {
  AsyncStorage.removeItem('loggedIn').then(() => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Welcome'})],
    });
    navigation.dispatch(resetAction);
  });
}
