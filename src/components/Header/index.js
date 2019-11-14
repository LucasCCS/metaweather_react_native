import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

export default function Header({city, temp}) {
  return (
    <View>
      <Text>{city}</Text>
      <Text>{isNaN(temp) && Math.round(temp.the_temp)}</Text>
    </View>
  );
}
