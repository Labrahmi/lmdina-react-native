import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

export default function LocationPage({ navigation }) {
  const [sound, setSound] = useState();
  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    });
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  // Unload sound when component unmounts to prevent memory issues
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between items-center w-full p-6">
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          activeOpacity={0.6}
          className="flex flex-row items-center gap-2"
        >
          <AntDesign name="arrowleft" size={30} color="#D7A366" />
        </TouchableOpacity>
      </View>
      <View
        style={{ alignItems: "left", flex: 1 }}
        className="items-center w-full p-4 gap-y-4"
      >
        <Text style={styles.text}>Tétouan Catholic Church</Text>
        <View className="flex flex-row items-start rounded-xl overflow-hidden">
          <Image
            source={require("./assets/tetouan.jpg")}
            className="rounded-xl"
            style={{ width: "100%", height: 256, borderRadius: 0 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 1)"]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <View className="p-3 gap-x-2 flex-row h-full justify-between items-end">
              <Text numberOfLines={1} className="text-white font-light text-sm">
                Play audio guide
              </Text>
              <TouchableOpacity onPress={playSound} className="px-2">
                <AntDesign name="play" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        <Text className="" style={styles.paragraph}>
          Built during the Spanish protectorate in Morocco, and still active
          today, it is considered one of the best examples of the Spanish
          influence and heritage on Tétouan lorem ipsum dolor sit amet
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18302D",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
  },
  paragraph: {
    color: "white",
    fontSize: 16,
    color: "#eef6f5",
    fontWeight: "200",
    textAlign: "left",
  },
});
