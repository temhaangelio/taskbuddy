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
  Check,
  Circle,
  HourglassLow,
  Handshake,
} from 'phosphor-react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const ParentChildProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userName} = route.params;
  const [tasks, setTasks] = useState(() => {
    const initialTasks = [
      {
        id: '1',
        task: 'Make your bed!',
        completed: true,
        date: new Date('2024-12-01'),
      },
      {
        id: '2',
        task: 'Complete your homework!',
        completed: true,
        date: new Date('2024-12-02'),
      },
      {
        id: '3',
        task: 'Clean your room!',
        completed: true,
        date: new Date('2024-12-03'),
      },
      {
        id: '11',
        task: 'Organize your bookshelf!',
        completed: false,
        date: new Date('2024-12-03'),
      },
      {
        id: '12',
        task: 'Arrange your toys!',
        completed: true,
        date: new Date('2024-12-03'),
      },
      {
        id: '13',
        task: 'Fold the laundry!',
        completed: false,
        date: new Date('2024-12-03'),
      },
      {
        id: '14',
        task: 'Clean the table!',
        completed: true,
        date: new Date('2024-12-03'),
      },
      {
        id: '15',
        task: 'Organize your closet!',
        completed: false,
        date: new Date('2024-12-03'),
      },
      {
        id: '4',
        task: 'Brush your teeth!',
        completed: true,
        date: new Date('2024-12-04'),
      },
      {
        id: '5',
        task: 'Read a book!',
        completed: false,
        date: new Date('2024-12-05'),
      },
      {
        id: '6',
        task: 'Pick up your toys!',
        completed: false,
        date: new Date('2024-12-06'),
      },
      {
        id: '7',
        task: 'Fold your clothes!',
        completed: false,
        date: new Date('2024-12-07'),
      },
      {
        id: '8',
        task: 'Take out the trash!',
        completed: true,
        date: new Date('2024-12-08'),
      },
      {
        id: '9',
        task: 'Walk the dog!',
        completed: false,
        date: new Date('2024-12-09'),
      },
      {
        id: '10',
        task: 'Eat your vegetables!',
        completed: true,
        date: new Date('2024-12-10'),
      },
    ];
    const completedTasks = initialTasks.filter(task => task.completed);
    const incompleteTasks = initialTasks.filter(task => !task.completed);
    return [...incompleteTasks, ...completedTasks];
  });
  const [newTask, setNewTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [repeatDropdownVisible, setRepeatDropdownVisible] = useState(false);
  const [selectedRepeatOption, setSelectedRepeatOption] = useState('Tekrar');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const filteredTasks = tasks.filter(task =>
    dayjs(task.date).isSame(selectedDate, 'day'),
  );

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
        if (isSorted) {
          return a.date - b.date; // Tarihe göre sıralama
        } else {
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1; // Tamamlanma durumuna göre sıralama
        }
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
            {userName}
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
            <View className="flex flex-row w-full justify-between items-centers border-b border-slate-200 pb-3 mb-5">
              <View className="flex flex-row bg-slate-200 px-4 py-1 rounded-full items-center gap-2">
                <Text className="text-sm font-custom text-slate-500">
                  {selectedDate.format('DD MMMM')}
                </Text>
                {!filteredTasks.length && (
                  <TouchableOpacity onPress={() => setSelectedDate(dayjs())}>
                    <X size={16} color="#94a3b8" />
                  </TouchableOpacity>
                )}
              </View>
              <View className="flex flex-row gap-2">
                <TouchableOpacity onPress={toggleSortOrder}>
                  {isSorted ? (
                    <SortAscending size={24} color="#94a3b8" />
                  ) : (
                    <SortDescending size={24} color="#94a3b8" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <CalendarDots size={2} color="#94a3b8" />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                visible={showDatePicker}
                animationType="slide">
                <View
                  className="flex-1 justify-end"
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  }}>
                  <View className="bg-white rounded-lg p-5">
                    <DateTimePicker
                      mode="single"
                      date={selectedDate.toDate()}
                      onChange={params => setSelectedDate(dayjs(params.date))}
                    />
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      className="bg-slate-900 mb-10 p-3 rounded-lg justify-center items-center">
                      <Text className="text-white font-customBold text-lg">
                        Select
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            {filteredTasks.length === 0 ? (
              <View className="flex flex-col flex-1 justify-center items-center">
                <Handshake size={100} color="#94a3b8" />
                <Text className="text-center text-slate-400 mt-5">
                  There is no mission for this date.
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredTasks}
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
                    <View
                      className={`flex flex-row gap-2 justify-start items-center p-0 py-2 ${
                        index === filteredTasks.length - 1
                          ? ''
                          : 'border-b border-slate-200'
                      }`}>
                      <View>
                        {item.completed ? (
                          <Check size={32} color="#0f172a" />
                        ) : (
                          <HourglassLow
                            weight="fill"
                            size={32}
                            color="#0f172a"
                          />
                        )}
                      </View>
                      <Text
                        className={`text-lg font-custom text-slate-900  ${
                          item.completed ? 'line-through' : ''
                        }`}>
                        {item.task}
                      </Text>
                    </View>
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
                <View className="flex flex-row gap-3 mb-3">
                  <TouchableOpacity className="flex flex-row justify-center items-center bg-slate-900 rounded-full p-1 px-3">
                    <CalendarDots size={16} color="#e2e8f0" />
                    <Text className="text-slate-100 text-sm ml-1 font-custom">
                      {new Date().toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: 'long',
                      })}
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      className="flex flex-row justify-center items-center bg-slate-900 rounded-full p-1 px-3"
                      onPress={toggleRepeatDropdown}>
                      <Repeat size={16} color="#e2e8f0" />
                      <Text className="text-slate-200 text-sm ml-1 font-custom">
                        {selectedRepeatOption || 'Tekrar'}
                      </Text>
                    </TouchableOpacity>
                    {repeatDropdownVisible && (
                      <View className="absolute p-3 top-8 w-24 left-0 bg-slate-900 rounded-lg shadow-lg z-10">
                        <TouchableOpacity
                          className="border-b border-slate-700 pb-1"
                          onPress={() => handleRepeatOptionSelect('Günlük')}>
                          <Text className="text-slate-200 text-sm font-custom">
                            Günlük
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="border-b border-slate-700 py-1"
                          onPress={() => handleRepeatOptionSelect('Haftalık')}>
                          <Text className="text-slate-200 text-sm font-custom">
                            Haftalık
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="border-b border-slate-700 py-1"
                          onPress={() => handleRepeatOptionSelect('Aylık')}>
                          <Text className="text-slate-200 text-sm font-custom">
                            Aylık
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleRepeatOptionSelect('Yıllık')}>
                          <Text className="text-slate-200 text-sm font-custom pt-1">
                            Yıllık
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
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
