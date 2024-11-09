import React from 'react';

const CerrarSesionButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include',
        
      });
      if (response.ok) {
        // Redirigir al login o hacer alguna acción después de cerrar sesión
        window.location.href = '/';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Cerrar sesión
    </button>
  );
};

export default CerrarSesionButton;
