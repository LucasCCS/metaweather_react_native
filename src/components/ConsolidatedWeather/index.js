import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

export default function ConsolidatedWeather({consolidatedWeathers}) {
  return (
    <View>
      {consolidatedWeathers !== undefined &&
        consolidatedWeathers.map(weather => (
          <View>
            <Text>{weather.applicable_date}</Text>
            <Text>{weather.the_temp}</Text>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://www.metaweather.com/static/img/weather/png/64/${
                  weather.weather_state_abbr
                }.png`,
              }}
            />
          </View>
        ))}
    </View>
  );
}
