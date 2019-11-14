import React from 'react';
import {View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';
import mapIcon from '../../assets/images/map_marker.png';
export default function Map({region}) {
  return (
    <View>
      <MapView region={region} style={styles.mapView}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}>
          <Image style={styles.mapViewIcon} source={mapIcon} />
        </Marker>
      </MapView>
    </View>
  );
}
