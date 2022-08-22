import { useState, useEffect } from 'react'
import socket from '../components/Socket';
import useValidateToken from "../hooks/useValidateToken";

export default function Chat() {
  useValidateToken();
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([{}]);
  const [usuario, setUsuario] = useState()
  const submit = e => {
    e.preventDefault();
    console.log(mensaje);
    /* Envia el mensaje */
    socket.emit('mensaje', {
      mensaje: mensaje,
      usuario: JSON.parse(localStorage.getItem('user')).nickname
    });
    setMensaje('');
  }
  const change = e => {
    setMensaje(e.target.value);
  }



  useEffect(() => {
    socket.on('mensajes', (data) => {
      setMensajes([
        ...mensajes,
        {
          ...mensajes,
          "mensaje": data.mensaje,
          "usuario": data.usuario
        }]);
    })

    return () => {
      socket.off()
    }

  }, [mensajes]);

  return (
    <div>
      <div className='m-28'>
        {mensajes.map((mensaje, index) => (
          <div key={index}>
            {mensaje.usuario}: {mensaje.mensaje}
          </div>
        )
        )}

      </div>
      <form onSubmit={submit}>
        <input type="text" value={mensaje} onChange={change} />
        <button type="submit">Enviar</button>
      </form>




    </div>
  )
}
