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

export default function Landing({ navigation }) {
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
        <StatusBar
        animated={true}
        backgroundColor="rgb(31, 60, 61)"
        />
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
              fontSize: 20,
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
