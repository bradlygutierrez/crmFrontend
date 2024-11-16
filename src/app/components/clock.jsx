import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Actualizar la hora cada segundo
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(timer);
    }, []);

    // Formatear la fecha y la hora
    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('es-ES', options);
    };

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="text-sm text-gray-600 text-center">
            <p>{formatDate(currentTime)}</p>
            <p>{formatTime(currentTime)}</p>
        </div>
    );
};

export default Clock;
