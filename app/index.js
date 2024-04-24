import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';

export default function index() {

    const handlePress = () => {
        console.log('WelcomeScreen');
    }
    return (
        <ImageBackground onLoad={() => { router.replace('/home') }} style={styles.background} source={require('./assets/screenBack.jpeg')}>
            <TouchableOpacity activeOpacity={0.8} className="m-8 mb-24 rounded-lg overflow-hidden p-4 bg-black">
                <Link onPress={handlePress} href="/choose_interests" className="text-white text-center font-semibold">Start The Experience</Link>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        borderRadius: 20,
    }
});
