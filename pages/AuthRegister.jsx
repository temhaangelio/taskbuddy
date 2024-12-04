import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Handshake} from 'phosphor-react-native';

export default function AuthRegister() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-gray-100 justify-center items-center px-4">
      <View className="flex flex-col items-center">
        <Handshake size={50} className="text-slate-900" />
        <Text className="text-3xl font-customBold text-slate-900 mb-10">
          TaskBuddy
        </Text>
      </View>
      <View className="w-full">
        <TextInput
          placeholder="Email"
          className="border border-slate-900 mb-2 w-full bg-white p-4 rounded-lg font-custom"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          className="border border-slate-900 mb-2 w-full bg-white p-4 rounded-lg font-custom"
          secureTextEntry
        />
        <TextInput
          placeholder="Password"
          className="border border-slate-900 w-full bg-white p-4 rounded-lg font-custom"
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        className="flex w-full bg-slate-900 p-3 rounded-lg mt-4">
        <Text className="text-center text-white text-lg font-customBold">
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AuthLogin')}
        className="flex w-full p-4 rounded-lg mt-4">
        <Text className="text-center text-slate-900 font-customBold text-lg">
          Do you have an account?!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customfont: {
    fontFamily: 'SourGummy-Regular',
    fontSize: 20,
  },
});
