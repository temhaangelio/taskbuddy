import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './store';
import {Provider} from 'react-redux';

import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import AuthForgot from './pages/AuthForgot';

import ChildDashboard from './pages/ChildDashboard';
import ParentDashboard from './pages/ParentDashboard';
import ParentGroup from './pages/ParentGroup';
import ParentChildProfile from './pages/ParentChildProfile';

import Profile from './pages/Profile';
import Bildirimler from './pages/Bildirimler';

const Stack = createNativeStackNavigator();
import './global.css';

const App = () => {
  const navigation = useRef();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('taskbuddytoken');
      if (token) {
        navigation.current?.navigate('Dashboard');
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigation}>
        <StatusBar hidden={true} />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthLogin" component={AuthLogin} />
          <Stack.Screen name="AuthRegister" component={AuthRegister} />
          <Stack.Screen name="AuthForgot" component={AuthForgot} />
          <Stack.Screen name="Bildirimler" component={Bildirimler} />

          <Stack.Screen name="Profile" component={Profile} />

          <Stack.Screen name="ChildDashboard" component={ChildDashboard} />
          <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
          <Stack.Screen name="ParentGroup" component={ParentGroup} />
          <Stack.Screen
            name="ParentChildProfile"
            component={ParentChildProfile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
