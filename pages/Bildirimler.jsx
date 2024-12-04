import {X} from 'phosphor-react-native';
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BellRinging} from 'phosphor-react-native';

const notifications = [
  {
    id: '1',
    title: 'Ali yatağını topladı.',
    date: '3 Saat Önce',
  },
  {
    id: '2',
    title: 'Mehmet ödevini yaptı.',
    date: '5 Saat Önce',
  },
  {
    id: '3',
    title: 'Fatma yemek yaptı.',
    date: '1 Gün Önce',
  },
  {
    id: '4',
    title: 'Ayşe ödevini yaptı.',
    date: '2 Gün Önce',
  },
  {
    id: '5',
    title: 'Ahmet yatağını topladı.',
    date: '3 Gün Önce',
  },
  {
    id: '6',
    title: 'Ali yatağını topladı.',
    date: '4 Gün Önce',
  },
  {
    id: '7',
    title: 'Ali yatağını topladı.',
    date: '5 Gün Önce',
  },
];

export default function ParentBildirimler() {
  const navigation = useNavigation();
  const [notificationList, setNotificationList] = React.useState(notifications);

  const handleDeleteNotification = id => {
    setNotificationList(
      notificationList.filter(notification => notification.id !== id),
    );
  };

  const renderItem = ({item}) => (
    <View className="p-4 bg-white mb-2 rounded border border-slate-200">
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
          <BellRinging size={12} className="self-end" color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
          <X size={12} className="self-end" color="#94a3b8" />
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-custom text-slate-900 mt-2">
        {item.title}
      </Text>
      <Text className="text-xs text-slate-400 self-end font-custom">
        {item.date}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-slate-900">
      <View className="flex flex-row mb-5 px-5 items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X className="self-end" size={24} color="#f1f5f9" />
        </TouchableOpacity>
        {notificationList.length > 0 && (
          <Text className="text-2xl font-custom text-slate-200">
            Bildirimler
          </Text>
        )}
      </View>
      {notificationList.length === 0 ? (
        <View className="flex-1 gap-5 justify-center items-center">
          <BellRinging weight="thin" size={100} color="#e2e8f0" />
          <Text className="text-center font-custom text-xl text-slate-200">
            You have no notifications!
          </Text>
        </View>
      ) : (
        <FlatList
          data={notificationList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          className="mt-4 px-5 pt-5"
        />
      )}
    </SafeAreaView>
  );
}
