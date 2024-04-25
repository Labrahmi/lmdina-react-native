import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export default function choose_interests() {
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);
  const handleLandmarkPress = async (e) => {
    console.log("Landmark pressed");
    await storeData("home_preference", "landmark");
    router.replace("/home");
  };
  const handleMountainPress = (e) => {
    console.log("Mountain pressed");
    router.replace("/home");
  };
  const handleBeachPress = (e) => {
    console.log("Beach pressed");
    router.replace("/home");
  };
  return (
    <View style={{flex:1, backgroundColor: "#18302D"}}>
      <TouchableOpacity
        onPress={() => {
          router.push("home");
        }}
        activeOpacity={0.6}
        className="flex flex-row items-center gap-2 m-4"
      >
        <AntDesign name="arrowleft" size={30} color="#D7A366" style={{fontWeight:"bold"}} />
      </TouchableOpacity>
      <View
        style={styles.container}
        // source={require("./assets/screenBack.jpeg")}
      >
        <Text className="text-3xl text-white text-left font-bold">
          What do you like ?
        </Text>
        <View className="flex w-full p-4 gap-12">
          {/* - - - - - - - - - - - - - - - */}
          <TouchableHighlight
            onPress={handleLandmarkPress}
            style={{
              backgroundColor: "#D7A366",
              borderRadius: 10,
              padding: 20,
              alignContent: "center",
              alignItems: "center",
            }}
            onPressIn={() => {
              setIsPressed1(!isPressed1);
            }}
            onPressOut={() => {
              setIsPressed1(!isPressed1);
            }}
            underlayColor={"#22403D"}
          >
            <Text
              style={{ color: isPressed1 ? "white" : "#22403D" }}
              className="font-bold  text-[#22403D] text-2xl"
            >
              Landmarks
            </Text>
          </TouchableHighlight>
          {/* - - - - - - - - - - - - - - - */}
          <TouchableHighlight
            onPress={handleMountainPress}
            style={{
              backgroundColor: "#D7A366",
              borderRadius: 10,
              padding: 20,
              alignContent: "center",
              alignItems: "center",
            }}
            onPressIn={() => {
              setIsPressed2(!isPressed2);
            }}
            onPressOut={() => {
              setIsPressed2(!isPressed2);
            }}
            underlayColor={"#22403D"}
          >
            <Text
              style={{ color: isPressed2 ? "white" : "#22403D" }}
              className="font-bold  text-[#22403D] text-2xl"
            >
              Mountains
            </Text>
          </TouchableHighlight>
          {/* - - - - - - - - - - - - - - - */}
          <TouchableHighlight
            onPress={handleBeachPress}
            style={{
              backgroundColor: "#D7A366",
              borderRadius: 10,
              padding: 20,
              alignContent: "center",
              alignItems: "center",
            }}
            onPressIn={() => {
              setIsPressed3(!isPressed3);
            }}
            onPressOut={() => {
              setIsPressed3(!isPressed3);
            }}
            underlayColor={"#22403D"}
          >
            <Text
              style={{ color: isPressed3 ? "white" : "#22403D" }}
              className="font-bold  text-[#22403D] text-2xl"
            >
              Beach
            </Text>
          </TouchableHighlight>
          {/* - - - - - - - - - - - - - - - */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 80,
    backgroundColor: "#18302D",
  },
  text: {
    borderRadius: 20,
  },
});
