// Clientes.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import EditCreateButton from '@/app/components/CreateButton';
import FormPopup from '@/app/components/FormPopup'; // Asegúrate de que esto apunta a tu componente de formulario
import TableSkeleton from '@/app/components/TableLoadingSkeleton';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await fetch('http://localhost:8000/pacientes');
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, []);

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setIsCreating(false); // Edición
    setIsPopupOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedClient(null); // Vaciar la selección
    setIsCreating(true); // Crear
    setIsPopupOpen(true);
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

      if (!response.ok) throw new Error('Error al actualizar los datos');
      const updatedClient = await response.json();

      // Actualizar el cliente en el estado
      setClientes((prevClientes) =>
        prevClientes.map(client => client.id_paciente === updatedClient.id_paciente ? updatedClient : client)
      );
      setIsPopupOpen(false);
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

      if (!response.ok) throw new Error('Error al crear el paciente');
      const newClient = await response.json();

      // Agregar el nuevo cliente al estado
      setClientes((prevClientes) => [...prevClientes, newClient]);
      setIsPopupOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <TableSkeleton></TableSkeleton>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton nameCreate="Paciente" handleCreate={handleCreateClick} />
      <DataDisplay title="Pacientes" data={clientes} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={isCreating ? handleCreateSubmit : handleEditSubmit}
        initialValues={isCreating ? null : selectedClient}
      />
    </div>
  );
}
