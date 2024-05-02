import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";

import Home from "./home";
import ChooseInterests from "./choose_interests";
import Chatbot from "./chatbot";
import Location from "./locationPage";
import Landing from "./landing";

const Stack = createNativeStackNavigator();

export default function index() {
  return (
    // <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="landing"
        screenOptions={{
          animation: "slide_from_right", // Custom transition animation
          presentation: "card", // Modal style
        }}
      >
        <Stack.Screen
          name="landing"
          options={{ headerShown: false }}
          component={Landing}
        />
        <Stack.Screen
          name="choose_interests"
          options={{ headerShown: false }}
          component={ChooseInterests}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="location"
          options={{ headerShown: false }}
          component={Location}
        />
        <Stack.Screen
          name="chatbot"
          options={{ headerShown: false }}
          component={Chatbot}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    // fontFamily:"AnticDidone-Regular"
  },
});
