import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  X,
  Plus,
  Trash,
  SortAscending,
  SortDescending,
  CalendarDots,
  Repeat,
  Circle,
  Handshake,
  User,
} from 'phosphor-react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

const ParentChildProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {groupName} = route.params;
  const [tasks, setTasks] = useState(() => {
    const initialUsers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Johnson',
      },
      {
        id: '4',
        firstName: 'Emily',
        lastName: 'Davis',
      },
      {
        id: '5',
        firstName: 'David',
        lastName: 'Brown',
      },
      {
        id: '6',
        firstName: 'Sarah',
        lastName: 'Miller',
      },
      {
        id: '7',
        firstName: 'James',
        lastName: 'Wilson',
      },
      {
        id: '8',
        firstName: 'Jessica',
        lastName: 'Moore',
      },
      {
        id: '9',
        firstName: 'Daniel',
        lastName: 'Taylor',
      },
      {
        id: '10',
        firstName: 'Laura',
        lastName: 'Anderson',
      },
    ];
    return initialUsers;
  });
  const [newTask, setNewTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [repeatDropdownVisible, setRepeatDropdownVisible] = useState(false);
  const [selectedRepeatOption, setSelectedRepeatOption] = useState('Tekrar');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          task: newTask,
          repeat: repeat,
        },
      ]);
      setNewTask('');
      setRepeat(false);
    }
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleSortOrder = () => {
    setTasks(prevTasks => {
      const sortedTasks = [...prevTasks].sort((a, b) => {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      });
      return sortedTasks;
    });
    setIsSorted(!isSorted);
  };

  const toggleRepeatDropdown = () => {
    setRepeatDropdownVisible(!repeatDropdownVisible);
  };

  const handleRepeatOptionSelect = option => {
    setSelectedRepeatOption(option);
    setRepeatDropdownVisible(false);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView className="flex-1 bg-slate-900">
        <View className="flex flex-row bg-slate-900 items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <X className="self-end" size={24} color="#f1f5f9" />
          </TouchableOpacity>
          <Text className="text-white text-xl text-center font-customBlack">
            {groupName}
          </Text>
          <View className="flex flex-row gap-1">
            <TouchableOpacity onPress={toggleModal}>
              <Plus className="self-end" size={24} color="#f1f5f9" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 bg-slate-900 mb-5 pt-5">
          <View className="flex flex-col justify-center items-center border border-slate-600 rounded-lg">
            <View className="flex flex-row w-full justify-between items-center">
              <View className="flex-1 flex flex-col rounded-tl-xl border-r border-b border-slate-600 justify-center items-center p-2">
                <View className="flex flex-row justify-between w-full">
                  <View className="flex flex-row gap-1 items-center">
                    <Circle size={12} color="#94a3b8" />
                    <Text className="font-custom text-xs text-slate-600">
                      Total
                    </Text>
                  </View>
                  <View className="bg-sky-600 px-2 py-1 rounded-full">
                    <Text className="font-customBold text-xs text-white">
                      10 %
                    </Text>
                  </View>
                </View>
                <Text className="font-customBlack text-4xl text-slate-300 w-full py-3 text-center">
                  5185
                </Text>
              </View>
              <View className="flex-1 flex flex-col justify-center items-center border-b border-slate-600 p-2">
                <View className="flex flex-row justify-between w-full">
                  <View className="flex flex-row gap-1 items-center">
                    <Circle size={12} color="#94a3b8" />
                    <Text className="font-custom text-xs text-slate-400">
                      Success
                    </Text>
                  </View>
                  <View className="bg-green-800 px-2 py-1 rounded-full">
                    <Text className="font-customBold text-xs text-white">
                      72.61 %
                    </Text>
                  </View>
                </View>
                <Text className="font-customBlack text-4xl text-slate-300 w-full py-3 text-center">
                  3765
                </Text>
              </View>
            </View>
            <View className="flex flex-row w-full justify-between items-center">
              <View className="flex-1 flex flex-col justify-center items-center p-2">
                <View className="flex flex-row justify-between w-full">
                  <View className="flex flex-row gap-1 items-center">
                    <Circle size={12} color="#94a3b8" />
                    <Text className="font-custom text-xs text-slate-400">
                      Failed
                    </Text>
                  </View>
                  <View className="bg-red-800 px-2 py-1 rounded-full">
                    <Text className="font-customBlack text-xs text-white">
                      21.06 %
                    </Text>
                  </View>
                </View>
                <Text className="font-customBlack  text-4xl text-slate-300 w-full py-3 text-center">
                  1092
                </Text>
              </View>
              <View className="flex-1 flex flex-col border-l border-slate-600 justify-center items-center p-2">
                <View className="flex flex-row justify-between w-full">
                  <View className="flex flex-row gap-1 items-center">
                    <Circle size={12} color="#94a3b8" />
                    <Text className="font-custom text-xs text-slate-400">
                      Waiting
                    </Text>
                  </View>
                  <View className="bg-yellow-600 px-2 py-1 rounded-full">
                    <Text className="font-customBlack text-xs text-white">
                      6.33 %
                    </Text>
                  </View>
                </View>
                <Text className="font-customBlack text-4xl text-slate-300 w-full py-3 text-center">
                  328
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-1 bg-slate-50 p-5 rounded-b-2xl">
          <View className="flex-1 border border-slate-300 bg-white rounded-lg p-5">
            <View className="flex flex-row w-full justify-between items-centers mb-5">
              <TouchableOpacity
                className="bg-slate-900 px-4 py-1 rounded-md flex flex-row gap-2 items-center"
                onPress={() => setSelectedDate(dayjs())}>
                <Plus size={16} color="#e2e8f0" />
                <Text className="text-slate-200 font-custom">Add User</Text>
              </TouchableOpacity>

              <View className="flex flex-row gap-2">
                <TouchableOpacity onPress={toggleSortOrder}>
                  {isSorted ? (
                    <SortAscending size={24} color="#94a3b8" />
                  ) : (
                    <SortDescending size={24} color="#94a3b8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {tasks.length === 0 ? (
              <View className="flex flex-col flex-1 justify-center items-center">
                <Handshake size={100} color="#94a3b8" />
                <Text className="text-center text-slate-400 mt-5">
                  There is no mission for this date.
                </Text>
              </View>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={task => task.id}
                renderItem={({item, index}) => (
                  <Swipeable
                    renderRightActions={() => (
                      <TouchableOpacity
                        onPress={() => deleteTask(item.id)}
                        className="bg-red-500 justify-center p-4">
                        <Trash color="#fff" size={24} />
                      </TouchableOpacity>
                    )}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ParentChildProfile', {
                          userName: item.firstName + ' ' + item.lastName,
                        })
                      }
                      className={`flex flex-row gap-2 justify-start items-center p-0 py-2 ${
                        index === tasks.length - 1
                          ? ''
                          : 'border-b border-slate-200'
                      }`}>
                      <View>
                        <User size={32} color="#0f172a" />
                      </View>
                      <Text className="text-lg font-custom text-slate-900">
                        {item.firstName} {item.lastName}
                      </Text>
                    </TouchableOpacity>
                  </Swipeable>
                )}
              />
            )}
          </View>
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}>
          <View
            className="flex-1 justify-end"
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
            }}>
            <View
              className="flex flex-col justify-between bg-white rounded-t-lg p-5"
              style={{height: '35%'}}>
              <View className="flex flex-row border-b border-slate-200 pb-3 mb-5 justify-between items-center">
                <Text className="text-lg font-custom text-slate-400">
                  Yeni Görev
                </Text>
                <TouchableOpacity onPress={toggleModal} className="self-end">
                  <X className="ml-5" color="#94a3b8" size={24} />
                </TouchableOpacity>
              </View>
              <View className="flex flex-col">
                <TextInput
                  className="border border-slate-200 w-full bg-white p-4 rounded-lg font-custom"
                  value={newTask}
                  onChangeText={setNewTask}
                  placeholder="Görev Adı"
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  addTask();
                  toggleModal();
                }}
                className="mt-2 bg-slate-900 shadow-md p-3 rounded-lg justify-center items-center">
                <Text className="text-white font-customBold text-lg">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ParentChildProfile;
