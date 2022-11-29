import axios from 'axios';
import {authHeader} from './AuthUtils';

export const api = ""

// export const getAll = () => axios.get(`${api}/api/v1/tableline`);
export const getAll = (userid) => axios.get(`${api}/getAll?userid=${userid}`, {headers: authHeader()});

export const create = (body) => axios.post(`${api}/addTransaction`,body, {headers: authHeader()});

export const update = (id, date, amount, category, comment) => axios.get(`${api}/updateTransaction?id=${id}&date=${date}&amount=${amount}&category=${category}&comment=${comment}`);

export const remove = (id) => axios.get(`${api}/deleteTransaction?id=${id}`);