import React from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';
export default function Map({region}) {
  return (
    <View>
      <MapView region={region} style={styles.mapView}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}>
          <View style={{backgroundColor: 'red', padding: 10}}>
            <Text>Usuário</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
}
