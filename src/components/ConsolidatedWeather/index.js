import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

export default function ConsolidatedWeather({consolidatedWeathers, scale}) {
  return (
    <View style={styles.consolidatedWeathersList}>
      {consolidatedWeathers !== undefined &&
        consolidatedWeathers.map((weather, i) => (
          <View
            key={weather.id}
            style={
              i === 0
                ? styles.consolidatedWeathersListItemNoBorder
                : styles.consolidatedWeathersListItem
            }>
            <Text>
              {new Date(weather.applicable_date).getDate() + 1}/
              {new Date(weather.applicable_date).getMonth() + 1}
            </Text>
            <Text>
              {Math.round(weather.the_temp)}°{scale}
            </Text>
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
