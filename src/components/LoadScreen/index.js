import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
export default function LoadScreen() {
  return (
    <View style={styles.loadScreen}>
      <ActivityIndicator size="large" color="#f48024" />
    </View>
  );
}
