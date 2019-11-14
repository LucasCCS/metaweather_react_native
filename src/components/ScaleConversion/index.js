import React from 'react';
import {View, Button} from 'react-native';

export default function ScaleConversion({
  consolidatedWeather,
  scaleType,
  onConvert,
}) {
  function handlerConversion() {
    const scaleToConversion = scaleType === 'C' ? 'F' : 'C';

    return onConvert({
      scale: scaleToConversion,
      convertedWeather: scaleConvert(consolidatedWeather, scaleToConversion),
    });
  }

  function scaleConvert(weatherToConvert, type) {
    switch (type) {
      case 'C':
        return weatherToConvert.map(weather => {
          return {
            ...weather,
            the_temp: Math.round((weather.the_temp - 32) / 1.8),
          };
        });
      case 'F':
        return weatherToConvert.map(weather => {
          return {
            ...weather,
            the_temp: Math.round(weather.the_temp * 1.8 + 32),
          };
        });
    }
  }

  return (
    <View>
      <Button title="Converter" onPress={handlerConversion} />
    </View>
  );
}
