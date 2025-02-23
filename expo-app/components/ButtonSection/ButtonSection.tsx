import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./ButtonSection.styles";
export default function ButtonSection() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Study Spot</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Coffee Stop</Text>
        </TouchableOpacity>
      </View>
    );
  }