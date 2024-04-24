import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const chatbot = () => {
  return (
    <View style={styles.container}>
      <Text>chatbot, Page</Text>
    </View>
  )
}

export default chatbot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

