'use client';
import { useEffect, useState } from 'react';
import DataDisplayTickets from '@/app/components/dataDisplayTickets';
import FormPopupTickets from '@/app/components/FormPopupTickets';
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
        const response = await fetch('http://localhost:8000/tickets', {
          credentials: 'include',
        });
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

  const handleRowClick = (ticket) => {
    setSelectedClient(ticket);
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
          credentials: 'include',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al crear el ticket');
      const newTicket = await response.json();

      setTickets((prevTickets) => [...prevTickets, newTicket]);
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChangeStatus = async (ticketId) => {
    console.log('Ticket ID seleccionado:', ticketId); 
    const requestBody = { status: 'Solucionado' }; // Cuerpo de la solicitud
    console.log('Cuerpo de la solicitud:', requestBody);
    
    try {
      const response = await fetch(`http://localhost:8000/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) throw new Error('Error al cambiar el estado del ticket');
      //window.location.reload(); // Recargar para mostrar el cambio
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  if (loading) return <TableSkeleton />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DataDisplayTickets
        title="Tickets"
        data={tickets}
        onRowClick={handleRowClick}
        onChangeStatus={handleChangeStatus} // Pasamos la función al componente DataDisplay
      />

      <FormPopupTickets
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={isCreating ? handleCreateSubmit : handleCreateSubmit}
        initialValues={isCreating ? null : selectedClient}
      />
    </div>
  );
}
