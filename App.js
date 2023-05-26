import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import AppNavigation from './src/route/AppNavigation';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={appStyles.cntainer}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const appStyles = StyleSheet.create({
  cntainer: {flex: 1},
});
