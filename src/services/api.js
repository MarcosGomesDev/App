import axios from 'axios';

const api = axios.create({
    baseURL: PROCESS.env.URL
})

export default api;