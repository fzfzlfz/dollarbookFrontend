import axios from 'axios';
import {authHeader} from './AuthUtils';


// export const getAll = () => axios.get(`${api}/api/v1/tableline`);
export const getAll = (userid) => axios.get(`/getAll?userid=${userid}`, {headers: authHeader()});

export const create = (body) => axios.post(`/addTransaction`,body, {headers: authHeader()});

export const update = (id, date, amount, category, comment) => axios.get(`/updateTransaction?id=${id}&date=${date}&amount=${amount}&category=${category}&comment=${comment}`);

export const remove = (id) => axios.get(`/deleteTransaction?id=${id}`);