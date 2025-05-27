import { Slot } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { CarritoProvider } from '../context/CarritoContext'

export default function RootLayout() {
  return (
    <CarritoProvider>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </CarritoProvider>
  )
}