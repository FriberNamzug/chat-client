import { useState, useEffect } from 'react'
import { getChat } from '../services/chat'

import { Avatar, Badge, Divider } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";

import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

import socket from '../components/Socket';
import useValidateToken from "../hooks/useValidateToken";


export default function Chat() {

  useValidateToken();

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([{}]);
  const [idChat, setIdChat] = useState();
  const [chat, setChat] = useState([])
  const URL = import.meta.env.VITE_RUTA_ASSETS;
  const navigate = useNavigate();


  const submit = e => {
    e.preventDefault();
    console.log(mensaje);
    socket.emit('mensaje', {
      room: idChat,
      message: mensaje,
    });
    setMensaje('');
  }

  useEffect(() => {
    socket.on('mensajes', (data) => {
      setMensajes([
        ...mensajes,
        {
          ...mensajes,
          "mensaje": data.message,
        }]);
    })
  }, [mensajes]);


  /* Obtenemos chat */
  const handleChat = (_id) => {
    if (idChat) {
      socket.emit('salirHabitacion', idChat);
    }
    setIdChat(_id);
    socket.emit('chat', _id);

    navigate(`../mensaje/${_id}/`);

  }


  const change = (e) => {
    setMensaje(e.target.value);
  }

  useEffect(() => {
    const response = async () => {
      const res = await getChat();
      setChat(res.data.data);
      console.log(res.data.data);
    }
    response();
  }, []);

  return (
    <div className='flex flex-row w-full'>
      <ul className='w-full max-w-xl'>
        <li className="my-5 bg-gray-100 border p-1 flex flex-row justify-center items-center w-full max-w-xl h-14 rounded-xl hover:bg-blue-200 cursor-pointer duration-500 ">
          <div
            className='w-full flex justify-center '>
            <span className='font-bold text-black mx-10'>Nuevo chat</span>
            <AddIcon className='' />
          </div>
        </li>
        {chat.map((chat, index) => {
          const miembro = chat.miembros.find(miembro => miembro.nickname !== JSON.parse(localStorage.getItem('user')).nickname);
          return (

            <li
              key={index}
              onClick={() => handleChat(chat._id)}
              className="my-5 max-w-xl bg-gray-100 border p-1 flex flex-row justify-between items-center w-full h-14 rounded-xl cursor-pointer hover:bg-blue-200 duration-500 hover:shadow-2xl">
              <div className='mx-5'>
                <Avatar src={`${URL}/${miembro.avatar}`} />
              </div>
              <div className='mx-5'>
                <span>{miembro.nickname}</span>
              </div>
              <div className='mx-5'>
                <Badge
                  color="primary"
                  variant="dot"
                  badgeContent={chat.mensajes.length}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}>
                  <SendIcon className='' />
                </Badge>
              </div>
            </li>
          )
        })}
      </ul>







      {/*       <div className='m-28'>
        {mensajes.map((mensaje, index) => (
          <div key={index}>
            {mensaje.mensaje}
          </div>
        )
        )}

      </div>
      <form onSubmit={submit}>
        <input type="text" value={mensaje} onChange={change} />
        <button type="submit">Enviar</button>
      </form> */}

    </div>
  )
}
