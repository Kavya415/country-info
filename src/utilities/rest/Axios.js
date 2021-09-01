import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    // baseURL: 'https://restcountries.eu/rest/v2',
    responseType: 'json',
});

export default axiosInstance;