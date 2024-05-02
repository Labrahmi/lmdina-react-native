import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react';
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
import chatbot_input from './chatbot_input';
import chatbot_output from './chatbot_output';

import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Chatbot({ navigation }) {

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

  return (
    <Stack.Navigator
      initialRouteName="chatbot_input"
      screenOptions={{
        animation: "slide_from_right", // Custom transition animation
        presentation: "modal", // Modal style
      }}
    >
      <Stack.Screen
        name="chatbot_input"
        options={{ headerShown: false }}
        component={chatbot_input}
      />
      <Stack.Screen
        name="chatbot_output"
        options={{ headerShown: false }}
        component={chatbot_output}
      />
    </Stack.Navigator>

    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.container}>
    //   <View className="flex flex-row justify-between items-center w-full p-6">
    //     <TouchableOpacity onPress={() => navigation.navigate("home")} activeOpacity={0.6} className="flex flex-row items-center gap-2">
    //       <AntDesign name="arrowleft" size={24} color="black" />
    //     </TouchableOpacity>
    //   </View>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //     <View style={{
    //       padding: 24,
    //       flex: 1,
    //       justifyContent: 'flex-end',
    //     }}>
    //       <TextInput
    //         returnKeyType={'send'}
    //         onChangeText={onChangeText}
    //         onSubmitEditing = {() => {
    //           console.log(text);
    //           onChangeText('');
    //           Alert.alert('Message sent', text);
    //         }}
    //         value={text}
    //         placeholder="Best place to swim nearby" style={styles.textInput} />
    //     </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>

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
