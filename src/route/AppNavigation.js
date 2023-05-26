import React from 'react';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../hooks/hooks';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const isAuthenticatedUser = useAppSelector(
    state => state.auth.isAuthenticated,
  );

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      {isAuthenticatedUser && (
        <Stack.Screen
          name="Home"
          options={{title: 'My profile', headerLeft: () => null}}
          component={HomeScreen}
        />
      )}
    </Stack.Navigator>
  );
};
export default AppNavigation;
