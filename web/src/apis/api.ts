import axios from 'axios'
import jwt_decode from 'jwt-decode';

type Token = {
  sub: string;
  exp: number;
  iat: number;
  expiresIn: number;
};


const axiosClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });

  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    let expired: boolean = false;
    if (token) {
      const decoded: Token = jwt_decode(token);
      const tokenExp: Date = new Date(decoded.exp * 1000);
      expired = tokenExp.getTime() < new Date().getTime();
      if (expired) {
        localStorage.clear();
      }
    }
    if (token && !expired) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });

  export default axiosClient