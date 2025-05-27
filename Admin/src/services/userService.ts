import axios from 'axios';

const API_URL = '/api/users';

export const getUsers = () => axios.get(API_URL).then(res => res.data);
