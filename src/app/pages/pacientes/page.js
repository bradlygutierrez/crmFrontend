// Clientes.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import EditCreateButton from '@/app/components/CreateButton';
import FormPopup from '@/app/components/FormPopup'; // Asegúrate de que esto apunta a tu componente de formulario

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); // Estado para la fila seleccionada
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el popup de edición
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar el popup de creación

  useEffect(() => {
    async function fetchClientes() {
      const response = await fetch('http://localhost:8000/pacientes');
      const data = await response.json();
      setClientes(data);
    }

    fetchClientes();
  }, []);

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setIsEditing(true); // Abrir el popup de edición
  };

  // Nueva función para manejar la apertura del popup vacío para crear un cliente
  const handleCreateClick = () => {
    setSelectedClient(null); // Asegúrate de que no hay un cliente seleccionado
    setIsCreating(true); // Abrir el popup de creación
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/pacientes/${selectedClient.id_paciente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedClient = await response.json();
      // Actualiza la lista de clientes
      setClientes((prevClientes) => prevClientes.map(client => client.id_paciente === updatedClient.id_paciente ? updatedClient : client));
      setIsEditing(false);
      setSelectedClient(null); // Limpiar la selección
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el paciente');
      }
      const newClient = await response.json();
      // Agregar el nuevo cliente a la lista
      setClientes((prevClientes) => [...prevClientes, newClient]);
      setIsCreating(false); // Cerrar el popup
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton 
        nameCreate="Paciente" 
        handleCreate={handleCreateClick} 
        handleEdit={() => setIsEditing(true)} 
      />
      <DataDisplay title="Pacientes" data={clientes} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedClient} // Pasar los valores iniciales al formulario
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedClient} // Aquí no es necesario, ya que se abre vacío
      />
    </div>
  );
}
