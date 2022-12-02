import axios from 'axios';
import {authHeader} from './AuthUtils';


export const login = (email, password) => axios.post(`/login?email=${email}&password=${password}`, {}, {headers: authHeader()});

export const register = (email, password) => axios.post(`/register?email=${email}&password=${password}`, {}, {headers: authHeader()});

export const changePic = (id, link) => axios.get(`/changePic?id=${id}&link=${link}`, {}, {headers: authHeader()});
