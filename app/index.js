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

function Landing({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    console.log("WelcomeScreen");
    router.replace("/choose_interests");
  };
  const [fontsLoaded, fontError] = useFonts({
    "AnticDidone-Regular": require("./assets/fonts/AnticDidone-Regular.ttf"),
  });
  return (
    <ImageBackground
      // onLoad={() => { {router.replace('/choose_interests')} }}
      style={styles.background}
      source={require("./assets/tetouan.jpg")}
      resizeMode="cover"
      imageStyle={{
        height: "60%",
        width: "100%",
      }}
    >
      <LinearGradient
        colors={["rgba(88, 166, 158, 0.1)", "#18302D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            marginTop: 80,
            gap: 45,
          }}
        >
          <Image source={require("./assets/Tetouan_text.png")} />
          <Text
            style={{
              color: "white",
              fontFamily: "AnticDidone-Regular",
              fontSize: 24,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Where culture thrives{"\n"}in every corner
          </Text>
        </View>
        <TouchableHighlight
          style={{
            backgroundColor: "#D7A366",
            borderRadius: 10,
            padding: 20,
            alignContent: "center",
            alignItems: "center",
            borderColor: "#D7A366",
            borderWidth: 3,
          }}
          onPressIn={() => setIsPressed(!isPressed)}
          onPressOut={() => setIsPressed(!isPressed)}
          underlayColor={"#22403D"}
          className="m-8 mb-24 rounded-lg overflow-hidden p-4"
          onPress={() => navigation.navigate("choose_interests")}
        >
          <Text
            style={{ color: isPressed ? "white" : "#22403D" }}
            className="text-center font-bold text-xl"
          >
            Start The Experience
          </Text>
        </TouchableHighlight>
      </LinearGradient>
    </ImageBackground>
  );
}

const Stack = createNativeStackNavigator();

export default function index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="landing"
        screenOptions={{
          animation: "slide_from_bottom", // Custom transition animation
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
    </NavigationContainer>
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
