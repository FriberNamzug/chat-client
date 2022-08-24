import { Avatar, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react';
import { getMensajes, addMensaje } from '../services/mensaje';
import useValidateToken from "../hooks/useValidateToken";

export default function Mensaje() {
    useValidateToken();

    const { idChat } = useParams();
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState();
    const [update, setUpdate] = useState(true);


    useEffect(() => {
        const obtenerMensajes = async () => {
            try {
                const response = await getMensajes(idChat);
                setMensajes(response.data.data);
            } catch (error) {
                setUpdate(!update);
            }
        }
        obtenerMensajes();
    }, [update]);

    return (
        <div className='w-full sticky top-0 z-50 '>
            <div className="mx-5 bg-gray-50 p-1 w-full h-screen rounded-2xl shadow-xl">

                <div className='flex flex-col'>
                    <div className='my-2 flex flex-row items-center'>
                        <div className='mx-5'>
                            <Avatar src={`${URL}/${JSON.parse(localStorage.getItem('user')).avatar}`} />
                        </div>
                        <div className='mx-5'>
                            <span className='font-bold text-black'>{JSON.parse(localStorage.getItem('user')).nickname}</span>
                        </div>
                    </div>
                    <div className='my-2 flex flex-row items-center'>
                        <div className='mx-5'>
                            <span>Ultima conexion: </span>
                        </div>
                    </div>

                    <Divider />
                </div>

                <div className="relative w-full p-6 overflow-y-auto h-[80vh] border border-black">
                    <ul className="space-y-2">
                        {mensajes && mensajes.map((mensaje, index) => {
                            return (
                                <li key={index} className={mensaje.remitente ? "flex justify-end":"flex justify-start"}>
                                    <div className={mensaje.remitente ? "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow" : "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"}>
                                        <span className="block">{mensaje.mensaje}</span>
                                    </div>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>

                <div className="flex flex-row bottom-0 sticky p-1 border-t border-gray-300">
                    <button>
                        <EmojiEmotionsIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <input type="text" placeholder="Message"
                        className="block w-full py-2 pl-4 mx-3 hover:bg-gray-200 bg-gray-100 duration-300 rounded-full outline-none focus:text-gray-700"
                        name="message" required />
                    <button type="submit">
                        <SendIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

            </div >
        </div>

    )
}
