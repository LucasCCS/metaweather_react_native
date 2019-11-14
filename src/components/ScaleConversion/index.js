/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { View, Text, Switch} from 'react-native';

import styles from './styles';

export default function ScaleConversion({
  consolidatedWeather,
  onConvert,
}) {
  const [switchStatus, setSwitchStatus] = useState(false);

  function handlerConvert(status) {
    return onConvert({
      scale: (status ? 'F' : 'C'),
      convertedWeather: scaleConvert(consolidatedWeather, status),
    });
  }

  function scaleConvert(weatherToConvert, type) {
    switch (type) {
      case false:
        return weatherToConvert.map(weather => {
          return {
            ...weather,
            the_temp: Math.round((weather.the_temp - 32) / 1.8),
          };
        });
      case true:
        return weatherToConvert.map(weather => {
          return {
            ...weather,
            the_temp: Math.round(weather.the_temp * 1.8 + 32),
          };
        });
    }
  }

  return (
    <View style={styles.ScaleConversionBox}>
      <Text>Celsius / Fahrenheit</Text>
      <Switch value={switchStatus} onValueChange={() => {
        let state = !switchStatus;
        setSwitchStatus(state);
        handlerConvert(state);
      }} />
    </View>
  );
}
