import axios from 'axios';

export const getMensajes = async (idChat) => {
    const response = await axios.get(`/mensaje/${idChat}`);
    return response;
}

export const addMensaje = async (destinatario, mensaje) => {
    const info = {
        "destinatario": destinatario,
        "mensaje": mensaje
    }
    const response = await axios.post(`/mensaje/add`, info);
    return response;
}