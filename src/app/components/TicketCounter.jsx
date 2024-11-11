import React, { useState, useEffect } from 'react';

const TicketCounter = () => {
    const [ticketsPendientes, setTicketsPendientes] = useState(0);

    useEffect(() => {
        // Llamada a la API para obtener el número de tickets pendientes
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:8000/tickets/pendientes');
                const data = await response.json();
                setTicketsPendientes(data.totalPendientes);
            } catch (error) {
                console.error('Error al obtener los tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="max-w-sm w-full h-full bg-white shadow-lg rounded-lg p-4 border-red-400">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Tickets Sin Responder</h3>
                <div className="text-4xl font-bold text-red-500 drop-shadow-lg">{ticketsPendientes}</div>
            </div>
            <p className="text-sm text-gray-600">Número de tickets con estado Pendiente.</p>
        </div>
    );
};

export default TicketCounter;
