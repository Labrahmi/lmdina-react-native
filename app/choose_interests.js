import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  StatusBar
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

export default function Choose_interests({ navigation }) {
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);
  const handleLandmarkPress = async (e) => {
    console.log("Landmark pressed");
    await storeData("home_preference", "landmark");
    navigation.navigate("home");
  };
  const handleMountainPress = (e) => {
    console.log("Mountain pressed");
    navigation.navigate("home");
  };
  const handleBeachPress = (e) => {
    console.log("Beach pressed");
    navigation.navigate("home");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#18302D" }}>
      <StatusBar
        animated={true}
        backgroundColor="#18302D"
        />
      <TouchableOpacity
        onPress={() => navigation.navigate("landing")}
        activeOpacity={0.6}
        className="flex flex-row items-center gap-2 m-4"
      >
        <AntDesign
          name="arrowleft"
          size={30}
          color="#D7A366"
          style={{ fontWeight: "bold" }}
        />
      </TouchableOpacity>
      <View
        style={styles.container}
        // source={require("./assets/screenBack.jpeg")}
      >
        <Text className="text-3xl text-white text-left font-bold">
          What do you like ?
        </Text>
        <View className="flex w-full p-4 gap-y-6">
          {/* - - - - - - - - - - - - - - - */}
          <TouchableHighlight
            onPress={() => navigation.navigate("home", { preference: "tourist_attraction" })}
            style={{
              backgroundColor: "#D7A366",
              borderRadius: 10,
              padding: 20,
              alignContent: "center",
              alignItems: "center",
              borderColor: "#D7A366",
              borderWidth: 3,
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
            onPress={() => navigation.navigate("home", { preference: "museum" })}
            style={{
              backgroundColor: "#D7A366",
              borderRadius: 10,
              padding: 20,
              alignContent: "center",
              alignItems: "center",
              borderColor: "#D7A366",
              borderWidth: 3,
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
              Museum
            </Text>
          </TouchableHighlight>
          {/* - - - - - - - - - - - - - - - */}
          <TouchableHighlight
            onPress={() => navigation.navigate("home", { preference: "amusement_park" })}
            style={{
              backgroundColor: "#D7A366",
              borderRadius: 10,
              padding: 20,
              alignContent: "center",
              alignItems: "center",
              borderColor: "#D7A366",
              borderWidth: 3,
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
              Amusement Park
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
