import axios from 'axios';
import {authHeader} from './AuthUtils';

export const api = ""

export const login = (email, password) => axios.post(`${api}/login?email=${email}&password=${password}`, {}, {headers: authHeader()});

export const register = (email, password) => axios.post(`${api}/register?email=${email}&password=${password}`, {}, {headers: authHeader()});
