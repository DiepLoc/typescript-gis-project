import axios from 'axios';

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_BACKEND_URL || "127.0.0.1:5000",   
});

export default clientAxios;