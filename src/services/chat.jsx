import axios from 'axios';

export const getChat = async () => {
    const response = await axios.get(`/chat`);
    return response;
}