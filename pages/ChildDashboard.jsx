import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  User,
  CalendarDots,
  CaretLeft,
  CheckCircle,
  Circle,
  X,
} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';

export default function ChildDashboard() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const limit = 10;

  const fetchTasks = async (pageNumber = 0) => {
    try {
      if (pageNumber === 0) setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${pageNumber * limit}`,
      );
      const data = await response.json();
      setTasks(prevTasks =>
        pageNumber === 0 ? data.todos : [...prevTasks, ...data.todos],
      );
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleCompleted = async (id, completed) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({completed: !completed}),
      });

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? {...task, completed: !task.completed} : task,
        ),
      );
    } catch (error) {
      console.error('Tamamlama durumunu güncelleme hatası:', error);
    }
  };

  const formatDate = date => {
    const options = {day: '2-digit', month: 'long', weekday: 'long'};
    return date.toLocaleDateString('tr-TR', options);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const loadMoreTasks = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchTasks(nextPage);
        return nextPage;
      });
    }
  };

  const renderTask = ({item, index}) => (
    <TouchableOpacity
      onPress={() => setSelectedTask(item)}
      className={`flex flex-row w-full items-center py-2 ${
        index === tasks.length - 1 ? 'pb-10' : 'border-b border-slate-200'
      }`}>
      <TouchableOpacity
        onPress={() => toggleCompleted(item.id, item.completed)}
        className="mr-3">
        {item.completed ? (
          <CheckCircle size={32} weight="fill" color="#0f172a" />
        ) : (
          <Circle size={32} color="#0f172a" />
        )}
      </TouchableOpacity>
      <Text
        className={`text-lg font-custom ${
          item.completed ? 'line-through text-gray-400' : 'text-slate-900'
        } flex-1`}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.todo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 pt-5">
        <View className="flex flex-row items-center justify-between pb-5 border-b border-slate-600 mb-5 mx-5">
          <Text className="text-xl font-bold text-slate-100 font-custom">
            Hello <Text className="font-customBold text-xl">Eymen</Text>,
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <User className="self-end" color="#f1f5f9" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex flex-col px-5 pb-5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-slate-400 text-xs font-customBold">
              All Tasks
            </Text>
            <TouchableOpacity>
              <CalendarDots size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row w-full justify-between items-center mt-5">
            <View className="flex-1 flex flex-col justify-center items-center border-b border-r border-slate-600 p-2">
              <View className="flex flex-row justify-between w-full">
                <View className="flex flex-row gap-1 items-center">
                  <Circle size={12} color="#94a3b8" />
                  <Text className="font-custom text-xs text-slate-400">
                    Total
                  </Text>
                </View>
                <View className="bg-blue-800 px-2 py-1 rounded-full">
                  <Text className="font-customBold text-xs text-white">
                    100%
                  </Text>
                </View>
              </View>
              <Text className="font-customBlack text-4xl text-slate-100 w-full py-3 text-center">
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
              <Text className="font-customBlack text-4xl text-slate-100 w-full py-3 text-center">
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
              <Text className="font-customBlack text-4xl text-slate-100 w-full py-3 text-center">
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
              <Text className="font-customBlack text-4xl text-slate-100 w-full py-3 text-center">
                328
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-1 flex-col bg-slate-50">
          <View className="flex flex-row justify-between bg-slate-100 border-b border-slate-200 items-center py-3 px-5">
            <Text>Seni bekleyen 10 görev var!</Text>
          </View>
          {loading && page === 0 ? (
            <View className="flex justify-center items-center border-t border-slate-200 flex-1 bg-white">
              <ActivityIndicator size="large" color="#172554" />
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={item => item.id.toString()}
              renderItem={renderTask}
              className="bg-slate-50 p-5 rounded-b-2xl"
              onEndReached={loadMoreTasks}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingMore && (
                  <ActivityIndicator size="small" color="#172554" />
                )
              }
              ListEmptyComponent={
                !loading && (
                  <View className="flex justify-center items-center py-10">
                    <Text className="text-slate-500 font-custom">
                      Bugün için hiçbir göreviniz yok!
                    </Text>
                  </View>
                )
              }
            />
          )}
        </View>
      </View>

      {selectedTask && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!selectedTask}
          onRequestClose={() => setSelectedTask(null)}>
          <View
            className="flex-1 justify-end bg-blue-900"
            style={{backgroundColor: 'rgba(30,27,78,0.8)'}}>
            <View className="bg-blue-50 rounded-t-2xl p-5">
              <TouchableOpacity
                className="self-end"
                onPress={() => setSelectedTask(null)}>
                <X className="text-gray-400" />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-blue-900">
                Görev Detayları
              </Text>
              <Text className="text-gray-600 mt-3">{selectedTask.todo}</Text>
              <Text className="text-gray-400 mt-2">
                Tamamlandı: {selectedTask.completed ? 'Evet' : 'Hayır'}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
