/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from './components/LoadScreen';
import Map from './components/Map';
import ConsolidatedWeather from './components/ConsolidatedWeather';
import Header from './components/Header';
import ScaleConversion from './components/ScaleConversion';

import { metaWeatherApi } from './services/api';



export default function App() {
  const [loadState, setLoadState] = useState(true);
  const [todayTemp, setTodayTemp] = useState([]);
  const [consolidatedWeather, setConsolidatedWeather] = useState([]);
  const [scaleType, setScaleType] = useState('C');
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
          Geolocation.getCurrentPosition(info => {
            const {latitude, longitude} = info.coords;
            setUserPosition({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            metaWeatherApi
              .get(`location/search/?lattlong=${latitude},${longitude}`)
              .then(location => {
                const {woeid} = location.data.shift();
                setUserLocationWoeId(woeid);
              })
              .catch(error => console.warn(error));
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
          const response = await metaWeatherApi.get(
              `location/${userLocationWoeId}`,
            );
          const location = response.data;
          handlerUpdateAppInfo(location.consolidated_weather);
          setUserLocation(location);
          setLoadState(false);
        }
    }
    getUserLocationInfo();
  }, [userLocationWoeId]);

  function handlerUpdateAppInfo(consolidated_weather) {
    setTodayTemp(consolidated_weather[0]);
    setConsolidatedWeather(consolidated_weather);
  }
  if (loadState) {
    return <LoadScreen />;
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
      <ScrollView>
        <Header city={userLocation.title} temp={todayTemp} scale={scaleType} />
        <Map region={userPosition} />
        <ConsolidatedWeather
          consolidatedWeathers={consolidatedWeather}
          scale={scaleType}
        />
        <ScaleConversion
          consolidatedWeather={consolidatedWeather}
          scaleType={scaleType}
          onConvert={response => {
            const {scale, convertedWeather} = response;
            setTodayTemp(convertedWeather[0]);
            handlerUpdateAppInfo(convertedWeather);
            setScaleType(scale);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
