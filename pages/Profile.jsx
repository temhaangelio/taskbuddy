import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  User,
  X,
  Pencil,
  Password,
  HandCoins,
  CaretRight,
  Eye,
  Translate,
  SignOut,
} from 'phosphor-react-native';

const ParentProfile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex flex-col h-screen justify-start">
        <View className="flex flex-col gap-5 px-5 rounded-b-2xl">
          <View className="flex flex-row items-center justify-between gap-2">
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => navigation.goBack()}>
              <X color="#f1f5f9" size={24} />
            </TouchableOpacity>
            <Text className="text-slate-100 text-2xl">Profile</Text>
          </View>

          <View className="flex flex-col gap-0 items-center p-5 py-10 rounded-lg">
            <User size={75} color="#cbd5e1" />
            <Text className="text-slate-100 text-xl font-customBold mt-2">
              Walter White
            </Text>
            <Text className="text-slate-100 text-sm font-custom">
              walterwhite@hotmail.com
            </Text>
          </View>
        </View>

        <View className="flex flex-col flex-1 bg-slate-50 gap-2 mt-5 p-5 pt-10">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="flex flex-row items-center justify-between border-b px-5 border-slate-300 pb-2">
            <View className="flex flex-row items-center gap-5">
              <User size={24} color="#0f172a" className=" mr-5" />
              <Text className="text-slate-900 text-lg font-custom">Parent</Text>
            </View>
            <CaretRight size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="flex flex-row items-center justify-between border-b px-5 border-slate-300 pb-2">
            <View className="flex flex-row items-center gap-5">
              <Pencil size={24} color="#0f172a" className=" mr-5" />
              <Text className="text-slate-900 text-lg font-custom">
                Update Information
              </Text>
            </View>
            <CaretRight size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="flex flex-row items-center justify-between border-b px-5 border-slate-300 pb-2">
            <View className="flex flex-row items-center gap-5">
              <Password size={24} color="#0f172a" />
              <Text className="text-slate-900 text-lg font-custom">
                Change Password
              </Text>
            </View>
            <CaretRight size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="flex flex-row items-center justify-between border-b px-5 border-slate-300 pb-2">
            <View className="flex flex-row items-center gap-5">
              <Translate size={24} color="#0f172a" />
              <Text className="text-slate-900 text-lg font-custom">
                Language
              </Text>
            </View>
            <CaretRight size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="flex flex-row items-center justify-between border-b px-5 border-slate-300 pb-2">
            <View className="flex flex-row items-center gap-5">
              <Eye size={24} color="#0f172a" />
              <Text className="text-slate-900 text-lg font-custom">View</Text>
            </View>
            <CaretRight size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="flex flex-row items-center justify-between px-5 pb-2">
            <View className="flex flex-row items-center gap-5">
              <HandCoins size={24} color="#0f172a" />
              <Text className="text-slate-900 text-lg font-custom">
                Remove Ads
              </Text>
            </View>
            <CaretRight size={24} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AuthLogin')}
            className="flex flex-row justify-center gap-3 bg-red-500 py-3 mt-5 items-center rounded-lg px-5">
            <Text className="text-white text-lg font-custom">Logout</Text>
            <SignOut size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute bottom-5 left-5 right-0 p-5">
        <Text className="text-slate-400 text-xs text-center font-custom">
          version 0.0.1
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ParentProfile;
