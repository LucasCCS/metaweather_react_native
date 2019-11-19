import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  ScaleConversionBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  ScaleConversionText: {
    fontSize: 20,
    color: '#666',
  },
  ScaleConversionSwitch: {
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
});
