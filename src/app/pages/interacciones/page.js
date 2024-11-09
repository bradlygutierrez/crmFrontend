// Interacciones.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import FormPopup from '@/app/components/FormPopupInteracciones'; // Asegúrate de que esto apunta a tu componente de formulario
import EditCreateButton from '@/app/components/CreateButton'; // Asegúrate de importar el botón adecuado

export default function Interacciones() {
  const [interacciones, setInteracciones] = useState([]);
  const [selectedInteraccion, setSelectedInteraccion] = useState(null); // Estado para la fila seleccionada
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el popup de edición
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar el popup de creación

  useEffect(() => {
    async function fetchInteracciones() {
      const response = await fetch('http://localhost:8000/interacciones'); // Cambia la URL por tu API real
      const data = await response.json();
      setInteracciones(data);
    }

    fetchInteracciones();
  }, []);

  const handleRowClick = (interaccion) => {
    setSelectedInteraccion(interaccion);
    setIsEditing(true); // Abrir el popup de edición
  };

  // Nueva función para manejar la apertura del popup vacío para crear una interacción
  const handleCreateClick = () => {
    setSelectedInteraccion(null); // Asegúrate de que no hay una interacción seleccionada
    setIsCreating(true); // Abrir el popup de creación
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/interacciones/${selectedInteraccion.id_interaccion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedInteraccion = await response.json();
      // Actualiza la lista de interacciones
      setInteracciones((prevInteracciones) => prevInteracciones.map(inter => inter.id_interaccion === updatedInteraccion.id_interaccion ? updatedInteraccion : inter));
      setIsEditing(false);
      setSelectedInteraccion(null); // Limpiar la selección
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/interacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear la interacción');
      }
      const newInteraccion = await response.json();
      // Agregar la nueva interacción a la lista
      setInteracciones((prevInteracciones) => [...prevInteracciones, newInteraccion]);
      setIsCreating(false); // Cerrar el popup
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton 
        nameCreate="Interacción" 
        handleCreate={handleCreateClick} 
        handleEdit={() => setIsEditing(true)} 
      />
      <div className="w-1/2 h-full">
        <p className="text-sm text-black">
          Nota, los tipos de interacciones son: consulta, urgente y seguimiento.
        </p>
      </div>
      <DataDisplay title="Interacciones" data={interacciones} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedInteraccion} // Pasar los valores iniciales al formulario
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedInteraccion} // Aquí no es necesario, ya que se abre vacío
      />
    </div>
  );
}
