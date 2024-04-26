import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { ScrollView, RefreshControl, Modal, Button } from 'react-native';


const chatbot = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is a modal content!</Text>
            <Button title="Close Modal" onPress={toggleModal} />
        </View>
    )
}

export default chatbot

const styles = StyleSheet.create({})