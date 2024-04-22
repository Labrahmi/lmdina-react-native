import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
    }
};

export default function choose_interests() {
    const handleLandmarkPress = async (e) => {
        console.log('Landmark pressed');
        await storeData('home_preference', 'landmark');
        router.replace('/home');
    };
    const handleMountainPress = (e) => {
        console.log('Mountain pressed');
        router.replace('/home');
    };
    const handleBeachPress = (e) => {
        console.log('Beach pressed');
        router.replace('/home');
    };
    return (
        <View style={styles.container} source={require('./assets/screenBack.jpeg')}>
            <Text className="text-2xl text-left my-4 font-thin">What do you like the most?</Text>
            <View className="flex w-full p-4 gap-4">
                {/* - - - - - - - - - - - - - - - */}
                <TouchableOpacity onPress={handleLandmarkPress} activeOpacity={0.8} className="bg-zinc-800 border border-zinc-900 rounded-lg p-2 flex gap-x-2 flex-row justify-center items-center">
                    <Text className="font-semibold text-white">Landmarks</Text>
                    <Image source={require('./assets/landmark.png')} className="w-8 h-8" />
                </TouchableOpacity>
                {/* - - - - - - - - - - - - - - - */}
                <TouchableOpacity onPress={handleMountainPress} activeOpacity={0.8} className="bg-orange-500 border border-orange-700 rounded-lg p-2 flex gap-x-2 flex-row justify-center items-center">
                    <Text className="font-semibold text-white">Mountains</Text>
                    <Image source={require('./assets/mountains.png')} className="w-8 h-8" />
                </TouchableOpacity>
                {/* - - - - - - - - - - - - - - - */}
                <TouchableOpacity onPress={handleBeachPress} activeOpacity={0.8} className="bg-blue-500 border border-blue-600 rounded-lg p-2 flex gap-x-2 flex-row justify-center items-center">
                    <Text className="font-semibold text-white">Beach</Text>
                    <Image source={require('./assets/beach.png')} className="w-8 h-8" />
                </TouchableOpacity>
                {/* - - - - - - - - - - - - - - - */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        borderRadius: 20,
    }
});

