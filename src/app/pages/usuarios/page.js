'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import EditCreateButton from '@/app/components/CreateButton'; // Asegúrate de importar el botón adecuado
import FormPopupUsuarios from '@/app/components/FormPopupUsuarios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]); // Inicializado como un arreglo vacío
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Estado para el usuario seleccionado
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el popup de edición
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar el popup de creación

  useEffect(() => {
    async function fetchUsuarios() {
      const response = await fetch('http://localhost:8000/usuarios'); // Cambia la URL por tu API real
      const data = await response.json();
      // Verificar que la respuesta sea un array antes de setear el estado
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error('Error: la respuesta de la API no es un arreglo');
        setUsuarios([]); // Si no es un array, se pone un arreglo vacío para evitar errores
      }
    }

    fetchUsuarios();
  }, []);

  const handleRowClick = (usuario) => {
    setSelectedUsuario(usuario);
    setIsEditing(true); // Abrir el popup de edición
  };

  const handleCreateClick = () => {
    setSelectedUsuario(null); // Asegúrate de que no hay un usuario seleccionado
    setIsCreating(true); // Abrir el popup de creación
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/usuarios/${selectedUsuario.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }
      const updatedUsuario = await response.json();
      // Actualiza la lista de usuarios
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map(user =>
          user.id_usuario === updatedUsuario.id_usuario ? updatedUsuario : user
        )
      );
      setIsEditing(false);
      setSelectedUsuario(null); // Limpiar la selección
      window.location.reload(); // Recargar para mostrar el cambio
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      const newUsuario = await response.json();
      // Agregar el nuevo usuario a la lista
      setUsuarios((prevUsuarios = []) => [...prevUsuarios, newUsuario]);
      setIsCreating(false); // Cerrar el popup
      window.location.reload(); // Si quieres recargar la página
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton
        nameCreate="Usuario"
        handleCreate={handleCreateClick}
        handleEdit={() => setIsEditing(true)}
      />
      <div className="w-1/2 h-full">
        <p className="text-sm text-black">
          Nota: Verifica que los datos ingresados para los usuarios sean válidos.
        </p>
      </div>
      <DataDisplay title="Usuarios" data={usuarios} onRowClick={handleRowClick} />
      <FormPopupUsuarios
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedUsuario} // Pasar los valores iniciales al formulario
      />
      <FormPopupUsuarios
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedUsuario} // Aquí no es necesario, ya que se abre vacío
      />
    </div>
  );
}
