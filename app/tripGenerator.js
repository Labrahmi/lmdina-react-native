import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import MapViewDirections from "react-native-maps-directions";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { byteLength, fromByteArray, toByteArray } from "base64-js";

export default function Trip({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [city, onChangeCity] = useState("destination city");
  const [opacity, setOpacity] = useState(1);
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  const [opacity4, setOpacity4] = useState(1);
  const [totalDays, setTotalDays] = useState(3);
  const [interests, setInterests] = useState([]);
  const [partner, setPartner] = useState(null);
  const [opt1, setOpt1] = useState(false);
  const [opt2, setOpt2] = useState(false);
  const [opt3, setOpt3] = useState(false);
  const [datares, setData] = useState(null);
  const [generation, setGeneration] = useState(false);

  //play audio
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
      text: datares, 
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

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  const fetchData = async (prompt) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-proj-MSM3uDcSR5DORPJlh7HbT3BlbkFJiwzD72CXiswxD9d2oOPb`, // API IS NOT AVAILABLE for you hehehe
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }], // [#FIX_ME#] prompt message should be dynamic and concatenated with user current location
        model: "gpt-3.5-turbo",
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
      setGeneration(false);
      setData(dataFromApi.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
  };
  const handleintrests = (option) => {
    if (interests.includes(option)) {
      setInterests(interests.filter((item) => item !== option));
    } else {
      setInterests([...interests, option]);
    }
    console.log(interests);
  };

  const generatePlaning = () => {
    if (interests.length === 0) {
      alert("please choose at least one interest");
      return;
    }
    if (partner === null) {
      alert("please choose who's coming with you");
      return;
    }
    if (city === "destination city") {
      alert("please enter your destination city");
      return;
    }
    const prompt =
      "generate trip planing for " +
      totalDays +
      " days in " +
      city +
      " , i m  " +
      partner +
      " and i m intrested in: " +
      interests.join(", ");
    fetchData(prompt);
  };

  const handlepartner = (option) => {
    setPartner(option);
    console.log(partner);
  };

  function close() {
    pickerRef.current.blur();
  }
  return (
    <ScrollView style={styles.container}>
      <Text className="text-white font-bold text-sm p-2">
        welcom to trip generator
      </Text>
      <Text className="text-white font-bold text-sm p-2">
        here you can generate your trip bases on your interests and location
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          color: "white",
          width: 200,
          padding: 10,
        }}
        onChangeText={onChangeCity}
        value={city}
      />
      <Text className="text-white font-bold text-sm p-2">
        choose your interests
      </Text>
      <View style={styles.section}>
        <Pressable
          onPress={() => {
            handleintrests("Art");
            setOpacity(opacity === 1 ? 0.5 : 1);
          }}
          style={{ opacity }}
        >
          <View style={styles.test}>
            <Text style={styles.text}>Art</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            handleintrests("Sports");
            setOpacity1(opacity1 === 1 ? 0.5 : 1);
          }}
          style={{ opacity: opacity1 }}
        >
          <View style={styles.test}>
            <Text style={styles.text}>Sports</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            handleintrests("Food");
            setOpacity2(opacity2 === 1 ? 0.5 : 1);
          }}
          style={{ opacity: opacity2 }}
        >
          <View style={styles.test}>
            <Text style={styles.text}>Food</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            handleintrests("Culture");
            setOpacity3(opacity3 === 1 ? 0.5 : 1);
          }}
          style={{ opacity: opacity3 }}
        >
          <View style={styles.test}>
            <Text style={styles.text}>Culture</Text>
          </View>
        </Pressable>
      </View>
      <Text className="text-white font-bold text-sm p-2">
        how long your trip will be?
      </Text>
      <View style={styles.section}>
        <Text className="text-white font-bold text-sm p-2">Total days : </Text>
        <Button
          title="-"
          disabled={totalDays === 1}
          style={{ borderRadius: "100%" }}
          onPress={() => setTotalDays(totalDays - 1)}
          color="#D7A366"
        />
        <Text className="text-white font-bold text-sm p-2">{totalDays}</Text>
        <Button
          title="+"
          disabled={totalDays === 7}
          style={{ borderRadius: "100%" }}
          onPress={() => setTotalDays(totalDays + 1)}
          color="#D7A366"
        />
      </View>
      <View>
        <Text className="text-white font-bold text-sm p-2">
          who's coming with you?
        </Text>
        <View style={styles.section}>
          <Checkbox
            style={{ color: "white" }}
            value={opt1}
            onValueChange={() => {
              setOpt1(!opt1);
              setOpt2(false);
              setOpt3(false);
              handlepartner("coming alone");
            }}
          />
          <Text className="text-white font-bold text-sm p-2">coming alone</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={{ color: "white" }}
            value={opt2}
            onValueChange={() => {
              setOpt2(!opt2);
              setOpt1(false);
              setOpt3(false);
              handlepartner("coming with friends");
            }}
          />
          <Text className="text-white font-bold text-sm p-2">
            coming with friends
          </Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={{ color: "white" }}
            value={opt3}
            onValueChange={() => {
              setOpt3(!opt3);
              setOpt1(false);
              setOpt2(false);
              handlepartner("coming with family");
            }}
          />
          <Text className="text-white font-bold text-sm p-2">
            coming with family
          </Text>
        </View>
      </View>
      <Button
        title="Generate"
        onPress={() => {
        setGeneration(true);
          generatePlaning();
        }}
        color="#D7A366"
      />
      <SafeAreaView>
        <Text className="text-white font-bold text-sm p-2">
          your trip planing
        </Text>
        {(datares === null && generation ) && <ActivityIndicator size="large" color="#D7A366" />}
        {datares !== null && (
          <View>
            <Text>hear the planing</Text>
            <TouchableOpacity onPress={playAudio} className="px-2">
                <AntDesign name="play" size={24} color="white" />
              </TouchableOpacity>
          </View>
        )}
        {/* <ScrollView
        className="rounded-lg overflow-hidden my-4"
        > */}
        <Text className="text-white font-bold text-sm p-2 h-full">
          {datares ? datares : ""}
        </Text>
        {/* </ScrollView> */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18302D",
    padding: 16,
    //   justifyContent: 'center',
    padding: 24,
  },
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "auto",
    gap: 10,
  },
  test: {
    backgroundColor: "white",
    width: "auto",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 2,
  },
});
