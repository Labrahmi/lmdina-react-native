import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, RefreshControl, Modal, Button } from 'react-native';
import Chatbot from './components/chatbot';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("value:", value);
    }
  } catch (e) {
    console.log('Error getting data');
  }
};

export default function home() {

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data:
    setTimeout(() => {
      // Update your data here
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay
  };

  let landmarks = [
    {
      "name": "Feddan Park",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
    },
    {
      "name": "Centro de Arte Moderno de Tetuan",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 3,
    },
    {
      "name": "Tanneries of Tetouan",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 5,
    },
    {
      "name": "Chamber of handicrafts",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 1,
    },
    {
      "name": "Archeological Museum",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
    },
    {
      "name": "Dar El Oddi",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
    },
    {
      "name": "Feddan Park",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
    },
    {
      "name": "Centro de Arte Moderno de Tetuan",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 3,
    },
    {
      "name": "Tanneries of Tetouan",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 5,
    },
    {
      "name": "Chamber of handicrafts",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 1,
    },
    {
      "name": "Archeological Museum",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
    },
    {
      "name": "Dar El Oddi",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
    },
  ]

  // getData('home_preference');

  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between items-center w-full p-6 pb-4">
        <AntDesign name="arrowleft" size={24} color="black" />
        <Feather name="user" size={24} color="black" />
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ padding: 24 }}
        source={require('./assets/screenBack.jpeg')}>
        <Text className="my-4 font-light text-xl">• Explore the beauty of our city 🏄‍♂️</Text>
        <View className="w-full h-64 rounded-lg overflow-hidden border border-zinc-300">
          <MapView
            initialRegion={{
              latitude: 35.6000,
              longitude: -5.300,
              latitudeDelta: 0.20,
              longitudeDelta: 0.20,
            }}
            className="w-full h-full"></MapView>
        </View>
        <View className="my-4"></View>
        <Button title="Open ChatBot" onPress={toggleModal} />
        <Modal animationType='slide' visible={isModalVisible} onRequestClose={toggleModal}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is a modal content!</Text>
            <Button title="Close Modal" onPress={toggleModal} />
          </View>
        </Modal>
        <View className="my-4"></View>
        <View className="flex flex-col gap-2">
          {landmarks.map((landmark, key) => (
            <TouchableOpacity activeOpacity={0.6} key={key} className="rounded-lg p-4 border border-zinc-300 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <FontAwesome5 name="landmark" size={20} color="black" />
                <Text className="text-black">{
                  landmark.name.trim().length > 20 ? landmark.name.trim().substring(0, 20) + '...' : landmark.name
                }</Text>
              </View>
              <View className="flex flex-row">
                <AntDesign name="star" size={12} color="black" />
                <AntDesign name="star" size={12} color="black" />
                <AntDesign name="star" size={12} color="black" />
                <AntDesign name="star" size={12} color="black" />
                <AntDesign name="staro" size={12} color="black" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="my-6"></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 24,
  },
  text: {
    borderRadius: 20,
  }
});
