/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, StyleSheet, Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';

import { metaWeatherApi } from './services/api';

export default function App() {
  const [userLocationWoeId, setUserLocationWoeId] = useState(0);
  const [userLocation, setUserLocation] = useState([]);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  useEffect(() => {
    async function requestPermissionGeolocation() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setUserPosition({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            metaWeatherApi
              .get(`location/search/?lattlong=${latitude},${longitude}`)
              .then(location => {
                const { woeid } = location.data.shift();
                setUserLocationWoeId(woeid);
              });
          });

        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestPermissionGeolocation();
  }, []);


  useEffect(() => {
    async function getUserLocationInfo() {
        if (userLocationWoeId !== 0) {
            const location = await metaWeatherApi.get(`location/${userLocationWoeId}`);
            console.log(location.data);
            setUserLocation(location.data);
        }
    }
    getUserLocationInfo();
  }, [userLocationWoeId]);



  return (
    <View>
      <View>
        <Text>{userLocation.title}</Text>
        <Text>{userLocation.consolidated_weather.shift().the_temp}</Text>
      </View>
      <View>
        <MapView region={userPosition} style={styles.mapView}>
          <Marker
            coordinate={{
              latitude: userPosition.latitude,
              longitude: userPosition.longitude,
            }}>
            <View style={{backgroundColor: 'red', padding: 10}}>
              <Text>Usuário</Text>
            </View>
          </Marker>
        </MapView>
      </View>
      <View>
        {userLocation.consolidated_weather !== undefined &&
          userLocation.consolidated_weather.map(weather => (
            <View>
              <Text>{weather.applicable_date}</Text>
              <Text>{weather.the_temp}</Text>
              <Image
                style={styles.weatherIcon}
                source={{
                  uri: `https://www.metaweather.com/static/img/weather/png/64/${weather.weather_state_abbr}.png`,
                }}
              />
            </View>
          ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  mapView: {
    width: 400,
    height: 400,
  },
  weatherIcon: {
    width: 64,
    height: 64,
  }
});
