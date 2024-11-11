import React, { useEffect, useState } from 'react';

const UsuarioInfo = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener el usuario logeado desde la API
    const obtenerUsuarioLogeado = async () => {
      try {
        const response = await fetch('http://localhost:8000/usuario-logeado', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data) {
          setUsuario(data);
        }
      } catch (error) {
        console.error('Error al obtener el usuario logeado:', error);
      }
    };

    obtenerUsuarioLogeado();
  }, []);

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }



  return (
    <div>
      <p className='text-gray-500 pt-7'>Bienvenido </p>
      <p className='text-gray-700 '>{usuario.usuario.username}</p>
    </div>
  );
};

export default UsuarioInfo;
