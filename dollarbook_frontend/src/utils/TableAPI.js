import axios from 'axios';

export const api = ""

// export const getAll = () => axios.get(`${api}/api/v1/tableline`);
export const getAll = () => axios.get(`${api}/getAll`);

export const create = (body) => axios.post(`${api}/addTransaction`,body);

export const update = (id, date, amount, category, comment) => axios.get(`${api}/updateTransaction?id=${id}&date=${date}&amount=${amount}&category=${category}&comment=${comment}`);

export const remove = (id) => axios.get(`${api}/deleteTransaction?id=${id}`);