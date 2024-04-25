import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Link, router } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export default function index() {
  const handlePress = () => {
    console.log("WelcomeScreen");
  };
  const [fontsLoaded, fontError] = useFonts({
    "AnticDidone-Regular": require("./assets/fonts/AnticDidone-Regular.ttf"),
  });
  return (
    <ImageBackground
      onLoad={() => { {router.replace('/home')} }}
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
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            gap: 80,
          }}
        >
          <Text style={{ color: "white", fontSize: 40, fontWeight: "900" }}>
            TETOUAN
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "AnticDidone-Regular",
              fontSize: 24,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Where culture thrives in every corner
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="m-8 mb-24 rounded-lg overflow-hidden p-4 bg-[#D7A366]"
        >
          <Link
            onPress={handlePress}
            href="/choose_interests"
            className="text-[#22403D] text-center font-bold text-xl"
          >
            Start The Experience
          </Link>
        </TouchableOpacity>
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
