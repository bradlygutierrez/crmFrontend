'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import EditCreateButton from '@/app/components/CreateButton';
import FormPopupTickets from '@/app/components/FormPopupTickets';
import TableSkeleton from '@/app/components/TableLoadingSkeleton';

export default function TicketsPaciente() {
    const [tickets, setTickets] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // Para almacenar el id del usuario logueado

    useEffect(() => {
        // Función para obtener el usuario logueado
        async function fetchUser() {
            try {
                const response = await fetch('http://localhost:8000/usuario-logeado', {
                    credentials: 'include', // Asegura que la sesión del usuario se envíe en la solicitud
                });
                if (!response.ok) throw new Error('Error al obtener el usuario logueado');
                const userData = await response.json();
                setUserId(userData.usuario.user_id);

                console.log("User id:")
                console.log(userData.usuario.user_id) // Guarda el ID del usuario logueado
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        // Si el ID del usuario está disponible, obtiene los tickets correspondientes
        if (userId) {
            async function fetchTickets() {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:8000/tickets/usuario`, {
                        credentials: 'include',

                    });
                    if (!response.ok) throw new Error('Error al obtener los tickets');
                    const data = await response.json();
                    setTickets(data); // Solo se mostrarán los tickets del usuario logueado
                } catch (error) {
                    console.error('Error al obtener los tickets:', error);
                } finally {
                    setLoading(false);
                }
            }

            fetchTickets();
        }
    }, [userId]);

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
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Error al crear el ticket');
            const newTicket = await response.json();

            // Verificar si prevTickets es un arreglo antes de intentar agregar el nuevo ticket
            setTickets((prevTickets) => {
                if (Array.isArray(prevTickets)) {
                    return [...prevTickets, newTicket]; // Agregar el nuevo ticket al estado si prevTickets es un arreglo
                }
                return [newTicket]; // Si no es un arreglo, crear un nuevo arreglo con el nuevo ticket
            });

            setIsPopupOpen(false);
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
                userId={userId}
            >
            </FormPopupTickets>
        </div>
    );
}
