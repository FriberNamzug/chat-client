import axios from 'axios';

export const loginService = async (info) => {
    const response = await axios.post(`/auth/login`, info);
    return response;
}