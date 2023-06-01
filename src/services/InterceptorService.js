import axios from "axios";

const interceptor = axios.create({
    baseURL: 'http://localhost:8081/authorizedApi',
});

interceptor.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
    function (error) {
        return Promise.reject(error)
    })
export default interceptor;