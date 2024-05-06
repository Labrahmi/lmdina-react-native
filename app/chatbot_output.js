import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, RefreshControl, Modal, Button, Key } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';;
import { EvilIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import KeyboardAvoidingComponent from './components/KeyboardAvoidingView';

export default function Chatbot({ navigation }) {
  var [data, setData] = useState(null);
  const [text, onChangeText] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    var openai_api_key = process.env.OPENAI_API_KEY;
    const fetchData = async () => {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-proj-MSM3uDcSR5DORPJlh7HbT3BlbkFJiwzD72CXiswxD9d2oOPb`, // API IS NOT AVAILABLE for you hehehe
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Best beaches nearby' }], // [#FIX_ME#] prompt message should be dynamic and concatenated with user current location
          model: 'gpt-3.5-turbo',
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });
      try {
        var dataFromApi = await response.json();
        console.log(dataFromApi.choices[0].message.content);
        // dataFromApi.split("\n").map((data, i) => i ? [<br />, data] : data); // [#FIX_ME#] this may help to split the data instead of using pre-wrap style (not working)
        setData(dataFromApi.choices[0].message.content);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

  }, []);

  return (
    <View className="flex flex-col gap-2 justify-between items-start w-full p-6 my-12">
      {/* <TextclassName="font-semibold text-lg">Best beaches nearby</TextclassName=> // [#FIX_ME#]  */}
      <View className="bg-white border border-gray-200 p-4 rounded-xl w-full">
        <Text className="text-sm font-light whitespace-pre-wrap">
          {data ? data : "data not available"}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
