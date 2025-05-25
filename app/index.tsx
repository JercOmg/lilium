import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from '../assets/styles';

const index = () => {
  return (
    <View>
      <Text style={[styles.titleHome, {fontSize:40}]}> Inicio </Text>
      <Link href="/about" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ir a About</Text>
        </Pressable>
      </Link>
    </View>
  );
};


export default index;
