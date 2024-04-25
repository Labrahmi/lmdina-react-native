import react from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const locationPage = () => {
  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between items-center w-full p-6">
        <TouchableOpacity
          onPress={() => {
            router.replace("choose_interests");
          }}
          activeOpacity={0.6}
          className="flex flex-row items-center gap-2"
        >
          <AntDesign name="arrowleft" size={30} color="#D7A366" />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={styles.text}>Tétouan Catholic Church</Text>
        <Image
          source={require("./assets/tetouan.jpg")}
          className="rounded-2xl"
          style={{ width: 250, height: 325, borderRadius: 0 }}
        />
        <Text style={styles.paragraph}>
          built during the Spanish protectorate in Morocco, and still active
          today, it is considered one of the best examples of the Spanish
          influence and heritage on Tétouan
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#18302D",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  paragraph: {
    color: "white",
    fontSize: 16,
    fontWeight: "200",
    textAlign: "center",
    padding: 12,
  },
});

export default locationPage;
