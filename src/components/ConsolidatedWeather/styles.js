import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  weatherIcon: {
    width: 20,
    height: 20,
  },
  consolidatedWeathersList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d6d7da',
    padding: 10,
    marginTop: 20,
  },
  consolidatedWeathersListItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#d6d7da',
    padding: 10,
  },
  consolidatedWeathersListItemNoBorder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
