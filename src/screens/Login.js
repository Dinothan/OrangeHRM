import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {saveUserAuth} from '../state/LoginSlice';
import {getUserInfo} from '../state/LoginThunk';
import {
  REACT_APP_API_ID,
  REACT_APP_REDIRECT_URL,
  REACT_APP_APP_SECRET,
} from '@env';

const LoginScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const userId = useAppSelector(state => state.auth.userId);
  const setIgToken = async data => {
    if (data.access_token !== null && data.user_id !== null) {
      await AsyncStorage.setItem('@security_Key', data.access_token);
      dispatch(saveUserAuth(data.user_id.toString()));
    }
  };
  let instagramLogin = useRef();

  useEffect(() => {
    setIgToken();
  });

  const getAuthentication = async () => {
    const AuthenticatedUser = await AsyncStorage.getItem('@security_Key');
    return AuthenticatedUser;
  };

  const getUser = async () => {
    const AuthenticatedUser = await getAuthentication().then(res => {
      return res;
    });
    await dispatch(
      getUserInfo({user_id: userId, access_token: AuthenticatedUser}),
    )
      .unwrap()
      .then(res => {
        navigation.navigate('Home', res);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  };

  return (
    <View style={loginStyles.background}>
      <View style={loginStyles.container}>
        <View style={loginStyles.logoSection}>
          <Image
            source={require('../assets/orange.png')}
            style={loginStyles.logo}
          />
        </View>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={loginStyles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}>
            <Text style={loginStyles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View>
          <TouchableOpacity onPress={() => instagramLogin.show()}>
            <Image
              source={require('../assets/instagram.png')}
              style={loginStyles.instagramBtn}
            />
          </TouchableOpacity>
        </View>
        <View style={loginStyles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={loginStyles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <InstagramLogin
        ref={ref => (instagramLogin = ref)}
        appId={REACT_APP_API_ID}
        appSecret={REACT_APP_APP_SECRET}
        redirectUrl={REACT_APP_REDIRECT_URL}
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={setIgToken}
        onLoginFailure={data => console.log('falure', data)}
      />
    </View>
  );
};

export default LoginScreen;

const loginStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 7,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  logoSection: {
    paddingBottom: 10,
  },
  instagramBtn: {borderRadius: 10},
});
