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
import MapView, { Marker , Polyline} from "react-native-maps";
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

export default function Home({ navigation, route }) {
  const paramKey = route.params ;
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState(null);
  const [location, setLocation] = useState(null);
  const [landmarks, setLandmarks] = useState(null);
  const [pdestination, setDestination] = useState(null);
  const [radius, setRadius] = useState(400);

  const googlekey = "AIzaSyCYMZImVJe4xQzNX-BA0GVJQmAaVXEXKLY";
  const getNearPlaces = (userlocation) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userlocation.latitude},${userlocation.longitude}&radius=${radius * 100}&type=${paramKey.preference}&key=${googlekey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const sortedLandmarks = data.results.sort((a, b) => b.rating - a.rating);
        setLandmarks(sortedLandmarks);
      });
  };

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
      getNearPlaces(location.coords);
    })();
  }, []);

  // getData('home_preference');

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handeldes = (loc) => {
    setDestination({
      latitude: loc.lat,
      longitude: loc.lng,
    });
  };

  function getLandmarkImage(landmark) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${landmark.photos[0].photo_reference}&key=${googlekey}`;
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
        <TouchableOpacity
          onPress={() => navigation.navigate("trip")}
          activeOpacity={0.6}
          className="flex flex-row items-center gap-2"
        >
          <AntDesign name="arrowright" size={30} color="#D7A366" />
        </TouchableOpacity>
      </View>
      <Text
        className="font-bold text-white text-xl mb-4"
        style={{ textAlign: "center" }}
      >
        Explore The Beauty Of The City
      </Text>
      <View
        style={{ flex: 1 }}
        className="w-full h-[30vh] overflow-hidden rounded-xl border-2 border-[#D7A366]"
      >
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
          style={{ width: "100%", height: "100%" }}
          // customMapStyle={mapstyle}
          onRegionChangeComplete={(region) => {
            setRadius(
              (Math.sqrt(
                Math.pow(region.latitudeDelta, 2) +
                Math.pow(region.longitudeDelta, 2)
              ) *
              111.32) /
              2
            );
            console.log(region);
            getNearPlaces(region);
          }}
        >
          {/* {pdestination && <Marker coordinate={pdestination} />} */}
          {/* {location && */}
        </MapView>
        <MapViewDirections
          origin={{
            latitude: location ? location.coords.latitude : 35.5889,
            longitude: location ? location.coords.longitude : -5.3626,
          }}
          destination={{
            latitude: 35.5889,
            longitude: -5.3626,
          }}
          strokeWidth={3}
          strokeColor="hotpink"
          apikey="AIzaSyCYMZImVJe4xQzNX-BA0GVJQmAaVXEXKLY"
        />
      </View>
      <ScrollView
        style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // style={{ paddingTop: 16, paddingBottom: 16}}
        className="rounded-lg overflow-hidden my-4"
      >
        {landmarks &&
          landmarks.map((landmark) => (
            <TouchableOpacity
              key={landmark.place_id}
              onPress={() => handeldes(landmark.geometry.location)}
              activeOpacity={0.6}
              className="rounded-lg border flex flex-row items-center justify-between overflow-hidden"
            >
              <View className="flex flex-row items-start">
                <Image
                  resizeMode="cover"
                  source={{
                    uri:
                      landmark.photos && landmark.photos.length > 0
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${landmark.photos[0].photo_reference}&key=${googlekey}`
                        : `https://img.icons8.com/ios-filled/50/image.png`,
                  }}
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
