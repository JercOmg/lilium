import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function LiliumHeader() {
  return (
    <View style={styles.container}>
      {/* Cambia la ruta de la imagen por la tuya */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        <Text style={{ fontWeight: 'bold' }}>lil</Text>
        <Text style={{ fontWeight: 'normal' }}>ium</Text>
        <Text style={{ fontWeight: 'bold' }}> menu</Text>
      </Text>
      <View style={styles.subtitleContainer}>
        <View style={styles.line} />
        <Text style={styles.subtitle}>barriga llena, vida buena</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.bottomLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    color: '#222',
    letterSpacing: 2,
    marginBottom: 0,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  subtitle: {
    color: '#2d4ecb',
    fontSize: 14,
    marginHorizontal: 8,
  },
  line: {
    height: 2,
    width: 40,
    backgroundColor: '#2d4ecb',
  },
  bottomLine: {
    height: 3,
    width: '100%',
    backgroundColor: '#111',
    marginTop: 8,
  },
})