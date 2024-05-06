import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { byteLength, fromByteArray, toByteArray } from "base64-js";
// import ReactNativeBlobUtil from "react-native-blob-util";

export default function LocationPage({ navigation }) {

  const elevenlabs_key = "cc01be6c1d3b6665097489add1947e08"; // process.env.ELEVENLABS_API_KEY;

  async function fetchAudioFromElevenLabsAndReturnFilePath() {
    const url =
      "https://api.elevenlabs.io/v1/text-to-speech/PiOPV4oley9ECqk0WgaN";
    const headers = {
      "xi-api-key": elevenlabs_key,
      "Content-Type": "application/json",
      accept: "audio/mpeg",
    };
    const data = {
      text: "Tétouan Catholic Church. Built during the Spanish protectorate in Morocco, and still active today, it is considered one of the best examples of the Spanish influence and heritage on Tétouan lorem ipsum dolor sit amet", //should be dynamic and based on the location
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    };

    const response = await axios.post(url, data, {
      headers: headers,
      responseType: "arraybuffer",
    });
    const filePath = FileSystem.documentDirectory + "output.mp3";
    await FileSystem.writeAsStringAsync(
      filePath,
      fromByteArray(new Uint8Array(response.data)),
      { encoding: FileSystem.EncodingType.Base64 }
    );
    return filePath;
  }

  const waitForDiJustFinishedPlaying = (sound) =>
    new Promise((resolve) => {
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          resolve(null);
        }
      });
    });

  async function playAudio() {
    const path = await fetchAudioFromElevenLabsAndReturnFilePath();
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: path });
      await sound.playAsync();
    } catch (error) {
      console.error("Error creating audio:", error);
    }
  }

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
              <TouchableOpacity onPress={playAudio} className="px-2">
                <AntDesign name="play" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
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
