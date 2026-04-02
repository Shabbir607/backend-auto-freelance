import axios from 'axios';
import { API_CONFIG, getAuthToken } from './lib/apiConfig';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const appKey = import.meta.env.VITE_FRONTEND_SECRET;
    if (appKey) {
        config.headers['X-App-Key'] = appKey;
    }
    return config;
});

export default axiosInstance;
