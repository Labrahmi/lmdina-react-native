import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, RefreshControl, Modal, Button } from "react-native";
import Chatbot from "./components/tchatbot";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

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
const googlekey = process.env.GOOGLE_API_KEY;
function getNearPlaces(userlocation, radius) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userlocation.latitude},${userlocation.longitude}&radius=${radius}&key=${googlekey}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState(null);
  const [location, setLocation] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data:
    setTimeout(() => {
      // Update your data here
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay
  };

  const mapstyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
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
      const tmpstate = await Location.reverseGeocodeAsync(location.coords);
      setState(tmpstate);
      // getNearPlaces(location.coords,4000);
    })();
  }, []);

  let landmarks = [
    {
      name: "Feddan Park",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
      image:
        "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C",
    },
    {
      name: "Centro de Arte Moderno de Tetuan",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 3,
      image:
        "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg",
    },
    {
      name: "Tanneries of Tetouan",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 5,
      image: "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg",
    },
    {
      name: "Chamber of handicrafts",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 1,
      image:
        "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg",
    },
    {
      name: "Archeological Museum",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
      image: "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg",
    },
    {
      name: "Dar El Oddi",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
      image:
        "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C",
    },
    {
      name: "Feddan Park",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
      image:
        "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C",
    },
    {
      name: "Centro de Arte Moderno de Tetuan",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 3,
      image:
        "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg",
    },
    {
      name: "Tanneries of Tetouan",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 5,
      image: "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg",
    },
    {
      name: "Chamber of handicrafts",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 1,
      image:
        "https://sergiobarce.files.wordpress.com/2013/11/centro-de-arte-moderno-de-tetuc3a1n-antigua-estacic3b3n.jpg",
    },
    {
      name: "Archeological Museum",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
      image: "https://d3lq8p6p6r1qxf.cloudfront.net/1616448438120.jpg",
    },
    {
      name: "Dar El Oddi",
      description:
        "The park is located in the heart of the city of Tetouan, and it is one of the most beautiful parks in the city, and it is characterized by its large area and its beautiful green spaces, and it is considered one of the most important tourist attractions in the city.",
      latitude: 35.5831,
      longitude: -5.3683,
      rating: 4,
      image:
        "https://scontent.fcmn1-4.fna.fbcdn.net/v/t1.6435-9/39748411_1175263262622741_3338696963599106048_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U8sKsOM3SJAAb6yz4Xv&_nc_ht=scontent.fcmn1-4.fna&oh=00_AfCVUpxgemryWtFGI5JUb4d2iVV5Q77_CbkOeBe_TKF58g&oe=664F784C",
    },
  ];

  // getData('home_preference');

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#18302D" />
      <View className="flex flex-row justify-between items-center w-full">
        <TouchableOpacity
          onPress={() => navigation.navigate("choose_interests")}
          activeOpacity={0.6}
          className="flex flex-row items-center gap-2"
        >
          <AntDesign name="arrowleft" size={30} color="#D7A366" />
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity
          onPress={() => navigation.navigate("chatbot")}
          activeOpacity={0.6}
          className="flex flex-row m-4"
          style={{ alignContent: "center", justifyContent: "center" }}
        >
          <MaterialCommunityIcons
            name="robot-outline"
            size={30}
            color="#D7A366"
          />
        </TouchableOpacity>
      </View>
      <Text
        className="font-bold text-white text-xl mb-4"
        style={{ textAlign: "center" }}
      >
        Explore The Beauty Of The City
      </Text>
      <View className="w-full h-[30vh] overflow-hidden rounded-xl border-2 border-[#D7A366]">
        <MapView
          region={{
            latitude: location ? location.coords.latitude : 35.5889,
            longitude: location ? location.coords.longitude : -5.3626,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation
          loadingEnabled
          provider={MapView.PROVIDER_GOOGLE}
          style={{
            borderBlockColor: "white",
          }}
          className="w-full h-full scale-100"
          customMapStyle={mapstyle}
        ></MapView>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // style={{ paddingTop: 16, paddingBottom: 16}}
        className="rounded-lg overflow-hidden my-4"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {landmarks.map((landmark, key) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("location")}
              activeOpacity={0.6}
              key={key}
              className="rounded-lg border flex flex-row items-center justify-between overflow-hidden"
            >
              <View className="flex flex-row items-start">
                <Image
                  resizeMode="cover"
                  source={{ uri: landmark.image }}
                  style={{ width: "100%", height: 140, borderRadius: 0 }}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0, 0, 0, 0.5)"]}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Text
                      numberOfLines={1}
                      className="text-white font-bold text-sm p-2"
                    >
                      {landmark.name}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className=""></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18302D",
    padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 24,
  },
  text: {
    borderRadius: 20,
  },
});
