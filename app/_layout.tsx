import { Slot } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const RootLayout = () => {
  return (
    <View>
      <Text> header </Text>


      <Slot />

       <Text> fOOTER </Text>
    </View>
  )
}

export default RootLayout