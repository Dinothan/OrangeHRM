import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

const HomeScreen = ({route, navigation}) => {
  const {id, username} = route.params;

  const onPressLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View style={homeStyles.headerContent}>
          <Image
            style={homeStyles.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          />

          <Text style={homeStyles.name}>Username: {username} </Text>
          <Text style={homeStyles.userInfo}>User ID: {id} </Text>
          <Button
            title="Logout"
            onPress={() => onPressLogout()}
            style={{backgroundColor: 'orange', padding: 5}}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const homeStyles = StyleSheet.create({
  sectionContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
    paddingBottom: 5,
  },
  body: {
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    color: '#ffffff',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 0.4,
    backgroundColor: '#708090',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
});
