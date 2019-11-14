import axios from 'axios';


const metaWeatherApi = axios.create({
  baseURL: 'https://www.metaweather.com/api/',
});


export { metaWeatherApi };