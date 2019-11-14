import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

export default function Header({city, temp, scale}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{city}</Text>
      <Text style={styles.temp}>
        {isNaN(temp) && `${Math.round(temp.the_temp)} °${scale}`}
      </Text>
    </View>
  );
}
