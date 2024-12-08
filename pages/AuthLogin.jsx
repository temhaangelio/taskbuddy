import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Handshake } from 'phosphor-react-native';
import api from '../store/api';

export default function AuthLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!email){
        Alert.alert('Uyarı', 'E-Posta adresinizi yazmalısınız!');
        return;
      }
      if (!password) {
        Alert.alert('Uyarı', 'Şifrenizi yazmalısınız!');
        return;
      }

      const response = await api.post('auth/login', {
        username: email,
        password: password,
      });

      const data = await response.json();

      if (response.ok && data.status) {
        //Parent - Child
        navigation.navigate(data.mode + 'Dashboard')
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }

      // if (response.ok) {
      //   data.username === 'emilys'
      //     ? navigation.navigate('ParentDashboard')
      //     : navigation.navigate('ChildDashboard');
      // } else {
      //   Alert.alert('Error', data.message || 'Invalid credentials');
      // }
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
      <View className="flex-1 bg-gray-100 justify-center items-center px-4">
        <View className="flex flex-col items-center">
          <Handshake size={50} className="text-slate-900" />
          <Text className="text-3xl font-customBold text-slate-900 mb-10">
            TaskBuddy
          </Text>
        </View>
        <View className="flex flex-col w-full">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border border-slate-900 mb-2 w-full bg-white p-4 rounded-lg font-custom"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="border border-slate-900 w-full bg-white p-4 rounded-lg font-custom"
            secureTextEntry
          />
          <TouchableOpacity
            className="mt-1 self-end"
            onPress={() => navigation.navigate('AuthForgot')}>
            <Text className="text-slate-900">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          className="flex w-full bg-slate-900 p-3 rounded-lg mt-5"
        >
          <Text className="text-center text-lg text-white font-customBold">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AuthRegister')}
          className="flex w-full p-4 rounded-lg mt-4">
          <Text className="text-center text-lg text-slate-900 font-customBold">
            Don't have an account!
          </Text>
        </TouchableOpacity>
      </View>
  );
}
