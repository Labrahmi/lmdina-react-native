import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, RefreshControl, Modal, Button } from "react-native";
import Chatbot from "./components/chatbot";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { useWindowDimensions } from "react-native";

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("value:", value);
    }
  } catch (e) {
    console.log("Error getting data");
  }
};

export default function home() {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placeToGo, setPlaceToGo] = useState({});
  const [widgetOn, setWidgetOn] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { width } = useWindowDimensions();
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data:
    setTimeout(() => {
      // Update your data here
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay
  };

  let landmarks = [
    {
      name: "Feddan Park",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
    },
    {
      name: "Centro de Arte Moderno de Tetuan",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 3,
    },
    {
      name: "Tanneries of Tetouan",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 5,
    },
    {
      name: "Chamber of handicrafts",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 1,
    },
    {
      name: "Archeological Museum",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
    },
    {
      name: "Dar El Oddi",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
    },
    {
      name: "Feddan Park",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
    },
    {
      name: "Centro de Arte Moderno de Tetuan",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 3,
    },
    {
      name: "Tanneries of Tetouan",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 5,
    },
    {
      name: "Chamber of handicrafts",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 1,
    },
    {
      name: "Archeological Museum",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
    },
    {
      name: "Dar El Oddi",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  // getData('home_preference');

  const heightAnim = useRef(new Animated.Value(40)).current; // Initial height

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: widgetOn ? 200 : 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [widgetOn]);

  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between items-center w-full p-6 pb-4">
        <AntDesign name="arrowleft" size={24} color="black" />
        <Feather name="user" size={24} color="black" />
      </View>
      {/* <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // style={{ padding: 24 }}
        source={require("./assets/screenBack.jpeg")}
      > */}
      {/* <Text className="my-4 font-light text-xl">• Explore the beauty of our city 🏄‍♂️</Text> */}
      <View className="w-full h-[100vh] rounded-lg overflow-hidden border border-zinc-300 relative">
        <MapView
          initialRegion={{
            latitude: location ? location.coords.latitude : 0.6,
            longitude: location ? location.coords.longitude : -5.3,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          region={{
            latitude: location ? location.coords.latitude : 0.6,
            longitude: location ? location.coords.longitude : -5.3,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          loadingEnabled
          provider={MapView.PROVIDER_GOOGLE}
          className="w-full h-[100vh]"
        >
          {/* <MapViewDirections /> */}
        </MapView>
      </View>
      <Animated.View
        style={{
          height: heightAnim,
          // backgroundColor: "rgba(0,0,0,0.5)",
        }}
        className="absolute bottom-0 rounded-3xl bg-slate-800 w-full"
      >
        <TouchableOpacity
          title="Toggle Widget"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 20,
            marginVertical: 10,
            height: 6,
            marginHorizontal: 120,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => setWidgetOn(!widgetOn)}
        ></TouchableOpacity>
        <View className="p-8 grid gap-4">
          <Text style={styles.widget}>hdfgdf</Text>
          <Text
            style={{
              color: "white",
            }}
          >
            hgj
          </Text>
        </View>
      </Animated.View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 24,
  },
  text: {
    borderRadius: 20,
  },
  widget: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
