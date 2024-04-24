import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, RefreshControl, Modal, Button } from 'react-native';
import Chatbot from './components/chatbot';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';;
import { EvilIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


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

  // Location
  console.log('Location');
  // 

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
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
      "image": "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C"
    },
    {
      "name": "Centro de Arte Moderno de Tetuan",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 3,
      "image": "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg"
    },
    {
      "name": "Tanneries of Tetouan",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 5,
      "image": "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg"
    },
    {
      "name": "Chamber of handicrafts",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 1,
      "image": "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg"
    },
    {
      "name": "Archeological Museum",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
      "image": "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg"
    },
    {
      "name": "Dar El Oddi",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
      "image": "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C"
    },
    {
      "name": "Feddan Park",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
      "image": "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C"
    },
    {
      "name": "Centro de Arte Moderno de Tetuan",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 3,
      "image": "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg"
    },
    {
      "name": "Tanneries of Tetouan",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 5,
      "image": "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg"
    },
    {
      "name": "Chamber of handicrafts",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 1,
      "image": "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg"
    },
    {
      "name": "Archeological Museum",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
      "image": "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg"
    },
    {
      "name": "Dar El Oddi",
      "description": "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      "latitude": 35.5831,
      "longitude": -5.3683,
      "rating": 4,
      "image": "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C"
    },
  ]

  // getData('home_preference');

  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between items-center w-full p-6">
        <TouchableOpacity onPress={() => {
          router.replace('choose_interests');
        }} activeOpacity={0.6} className="flex flex-row items-center gap-2">
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity onPress={() => {
          router.replace('chatbot');
        }} activeOpacity={0.6} className="flex flex-row items-center gap-2">
          <MaterialCommunityIcons name="robot-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ padding: 24 }}>
        <Text className="mt-4 font-light text-xl">• Explore the beauty of our city 🏄‍♂️</Text>
        <Text className="flex flex-row justify-center items-center w-full p-2">
          <EvilIcons name="location" size={16} color="black" />
          <Text className="">Tetouan</Text>
        </Text>
        <View className="my-4"></View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {landmarks.map((landmark, key) => (
            <TouchableOpacity activeOpacity={0.6} key={key} className="rounded-lg border border-zinc-200 flex flex-row items-center justify-between overflow-hidden">
              <View className="flex flex-row items-start">
                <Image resizeMode='cover' source={{ uri: landmark.image }} style={{ width: 150, height: 200, borderRadius: 0 }} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text numberOfLines={1} className="text-white font-bold text-sm p-2">{landmark.name}</Text>
                  </View>
                </LinearGradient>
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
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 24,
  },
  text: {
    borderRadius: 20,
  }
});
