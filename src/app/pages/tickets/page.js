// Clientes.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import EditCreateButton from '@/app/components/CreateButton';
import FormPopupTickets from '@/app/components/FormPopupTickets'
import TableSkeleton from '@/app/components/TableLoadingSkeleton';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch('http://localhost:8000/tickets');
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const handleRowClick = (tickets) => {
    setSelectedClient(tickets);
    setIsCreating(false); // Edición
    setIsPopupOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedClient(null); // Vaciar la selección
    setIsCreating(true); // Crear
    setIsPopupOpen(true);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (!response.ok) throw new Error('Error al crear el ticket');
      const newTicket = await response.json();

      // Agregar el nuevo cliente al estado
      setTickets((prevTickets) => [...prevTickets, newTicket]);
      setIsPopupOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <TableSkeleton></TableSkeleton>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton nameCreate="Ticket" handleCreate={handleCreateClick} />
      <DataDisplay title="Tickets" data={tickets} onRowClick={handleRowClick} />
     
      <FormPopupTickets
       isOpen={isPopupOpen}
       onClose={() => setIsPopupOpen(false)}
       onSubmit={isCreating ? handleCreateSubmit : handleCreateSubmit}
       initialValues={isCreating ? null : selectedClient}
      >

      </FormPopupTickets>
    </div>
  );
}
