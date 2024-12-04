import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import {
  Folder,
  Plus,
  User,
  Heart,
  BellRinging,
  X,
  MagnifyingGlass,
  Circle,
} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('user');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 10;

  const fakeUsers = [
    {id: 1, name: 'John Doe', type: 'user', favorite: true},
    {id: 2, name: 'Jane Smith', type: 'user', favorite: false},
    {id: 3, name: 'Michael Johnson', type: 'user', favorite: false},
    {id: 4, name: 'Emily Davis', type: 'user', favorite: false},
    {id: 5, name: 'Developers', type: 'group', favorite: false},
    {id: 6, name: 'Designers', type: 'group', favorite: false},
  ];

  useEffect(() => {
    setTasks(fakeUsers);
    setLoading(false);
  }, []);

  const addUser = () => {
    if (inputValue.trim() === '') return;
    const newUser = {
      id: tasks.length + 1,
      name: inputValue,
      type: 'individual',
      completed: false,
    };
    setTasks([...tasks, newUser]);
    setInputValue('');
  };

  const addGroup = () => {
    if (inputValue.trim() === '') return;
    const newGroup = {id: tasks.length + 1, name: inputValue, type: 'group'};
    setTasks([...tasks, newGroup]);
    setInputValue('');
  };

  const loadMoreTasks = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        return nextPage;
      });
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderUser = ({item, index}) => {
    if (item.isButton) {
      return (
        <TouchableOpacity onPress={toggleModal} className="flex-1">
          <View className="flex-row flex-1 shadow-md items-center justify-center border border-dashed bg-slate-900 rounded-lg">
            <Plus className="bg-slate-100" color="#f1f5f9" />
            <Text className="text-slate-100 text-lg ml-2 font-customBlack">
              Add
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    const handlePress = () => {
      if (item.type === 'group') {
        navigation.navigate('ParentGroup', {groupName: item.name});
      } else {
        navigation.navigate('ParentChildProfile', {userName: item.name});
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        className="flex-1"
        style={{marginLeft: index % 2 === 0 ? 0 : 10}}>
        <View className="flex flex-row items-center relative border border-slate-300 bg-white rounded-lg p-4">
          <View>
            {item.type === 'group' ? (
              <Folder className="text-slate-900" />
            ) : (
              <User className="text-slate-900" />
            )}
          </View>
          <Text
            className="font-custom ml-2 text-slate-900 text-lg"
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>
          {item.type === 'group' ? (
            <Text className="absolute right-2 top-2 text-slate-500">
              {item.memberCount || 0}
            </Text>
          ) : (
            item.favorite && (
              <View className="absolute right-2 top-2">
                <Heart className=" text-slate-500" weight="fill" size={12} />
              </View>
            )
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex flex-col justify-between">
        <View className="flex flex-row bg-slate-900 items-center justify-between p-5">
          <View className="flex flex-col gap-0">
            <Text className="text-xl font-bold text-slate-100 font-customLight">
              Hello <Text className="font-customBlack">Walter</Text>,
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <TouchableOpacity
              onPress={() => navigation.navigate('Bildirimler')}>
              <BellRinging className="self-end" color="#f1f5f9" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <User className="self-end" color="#f1f5f9" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {loading && page === 0 ? (
            <View className="flex justify-center items-center flex-1 bg-white">
              <ActivityIndicator size="large" color="#000000" />
            </View>
          ) : (
            <View className="flex flex-col rounded-lg">
              <View className="flex flex-row relative gap-1 bg-slate-50 p-5 pb-0">
                <View className="absolute left-8 top-12 transform -translate-y-1/2 z-50">
                  <MagnifyingGlass color="#94a3b8" />
                </View>
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="border border-slate-300 w-full bg-white p-4 pl-12 rounded-lg font-custom"
                  keyboardType="email-address"
                  placeholder="User or Group"
                />
              </View>
              <FlatList
                data={[{isButton: true}, ...filteredTasks]}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : `button-${index}`
                }
                renderItem={renderUser}
                className="bg-slate-50 p-5 rounded-b-2xl"
                onEndReached={loadMoreTasks}
                onEndReachedThreshold={0.5}
                numColumns={2}
                key={2}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
              />
            </View>
          )}
        </View>
        <Text className="text-center text-xs font-customBold text-slate-500 mt-5">
          version 0.0.1
        </Text>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
          }}>
          <View
            className="flex flex-col justify-between bg-slate-50 rounded-t-lg p-5"
            style={{height: '40%'}}>
            <View className="flex flex-col">
              <View className="flex flex-row pb-3 border-b border-slate-200 justify-between items-center">
                <Text className="text-lg font-custom text-slate-400">New</Text>
                <TouchableOpacity onPress={toggleModal} className="self-end">
                  <X className="ml-5" size={24} color="#94a3b8" />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row justify-around mb-4 mt-5 bg-slate-900 rounded-md py-2">
                <View className="flex-1 items-center justify-center relative">
                  <TouchableOpacity
                    className="flex flex-row justify-center items-center"
                    onPress={() => setActiveTab('user')}>
                    {activeTab === 'user' ? (
                      <Circle size={12} weight="fill" color="#f1f5f9" />
                    ) : (
                      <Circle size={12} color="#94a3b8" />
                    )}
                    <Text
                      className={`ml-2 text-lg font-customBold ${
                        activeTab === 'user'
                          ? 'text-slate-100'
                          : 'text-slate-400'
                      }`}>
                      User
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1 items-center justify-center relative">
                  <TouchableOpacity
                    className="flex flex-row justify-center items-center"
                    onPress={() => setActiveTab('group')}>
                    {activeTab === 'group' ? (
                      <Circle size={12} weight="fill" color="#f1f5f9" />
                    ) : (
                      <Circle size={12} color="#f1f5f9" />
                    )}
                    <Text
                      className={`ml-2 text-lg font-customBold ${
                        activeTab === 'group'
                          ? 'text-slate-100'
                          : 'text-slate-400'
                      }`}>
                      Group
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                className="border border-slate-900 w-full bg-white p-4 rounded-lg mb-4 font-custom"
                keyboardType="email-address"
                placeholder="Name"
              />
            </View>
            <View className="flex flex-col gap-3">
              <TouchableOpacity
                className="bg-slate-900 justify-center items-center rounded-md py-2"
                onPress={() => {
                  if (activeTab === 'user') {
                    addUser();
                  } else {
                    addGroup();
                  }
                  toggleModal();
                }}>
                <Text className="text-slate-100 text-lg font-customBlack">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
