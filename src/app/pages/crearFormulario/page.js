'use client'

import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; // Importar icono de estrella

const FormularioSatisfaccionUsuario = () => {
  const [formData, setFormData] = useState({
    limpieza: 1,
    atencion: 1,
    calidad_servicio: 1,
    tiempo_espera: 1,
    instalaciones: 1,
  });

  const [message, setMessage] = useState(''); // Estado para el mensaje
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si está enviando
  const [timeLeft, setTimeLeft] = useState(0); // Estado para el tiempo restante
  const [canSubmit, setCanSubmit] = useState(true); // Estado para controlar si el formulario puede enviarse

  // Maneja el cambio de cada combo box
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
    }));
  };

  // Maneja el envío del formulario
  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/formularios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el formulario');
      }

      setMessage('Formulario creado exitosamente');
      setCanSubmit(false); // Deshabilitar el envío de formulario
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false); // Restablecer el estado de envío
    }
  };

  // Enviar datos cuando se hace clic en el botón
  const handleSubmit = (e) => {
    e.preventDefault();

    // Evitar enviar si ya se está enviando o si no se puede enviar
    if (isSubmitting || !canSubmit) return;

    setIsSubmitting(true); // Deshabilitar el botón de envío al enviar el formulario
    handleCreateSubmit(formData);
  };

  // Actualiza el valor de las estrellas de cada campo específico
  const renderStars = (value, fieldName) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={24}
        className={`cursor-pointer ${index < value ? 'text-yellow-500' : 'text-gray-400'}`}
        onClick={() => setFormData((prevData) => ({ ...prevData, [fieldName]: index + 1 }))}
      />
    ));
  };

  // Función para manejar el temporizador de 5 minutos
  useEffect(() => {
    if (!canSubmit) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setCanSubmit(true); // Permitir enviar después de 5 minutos
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Decrementa cada segundo

      return () => clearInterval(interval);
    }
  }, [canSubmit]);

  // Función para iniciar el temporizador al enviar el formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || !canSubmit) return;

    setIsSubmitting(true);
    handleCreateSubmit(formData);
    setTimeLeft(300); // Establecer tiempo de espera en 5 minutos (300 segundos)
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">¡Cuéntanos cómo fue tu experiencia en CLIN MED!</h1>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">Formulario de Satisfacción</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600" htmlFor="limpieza">
              Limpieza
            </label>
            <div className="flex space-x-1">{renderStars(formData.limpieza, 'limpieza')}</div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600" htmlFor="atencion">
              Atención
            </label>
            <div className="flex space-x-1">{renderStars(formData.atencion, 'atencion')}</div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600" htmlFor="calidad_servicio">
              Calidad de Servicio
            </label>
            <div className="flex space-x-1">{renderStars(formData.calidad_servicio, 'calidad_servicio')}</div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600" htmlFor="tiempo_espera">
              Tiempo de Espera
            </label>
            <div className="flex space-x-1">{renderStars(formData.tiempo_espera, 'tiempo_espera')}</div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600" htmlFor="instalaciones">
              Instalaciones
            </label>
            <div className="flex space-x-1">{renderStars(formData.instalaciones, 'instalaciones')}</div>
          </div>

          <button
            type="submit"
            className={`mt-4 w-full ${isSubmitting || !canSubmit ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'} text-white p-2 rounded-md hover:bg-blue-600`}
            disabled={isSubmitting || !canSubmit} // Deshabilitar el botón si no se puede enviar
          >
            {isSubmitting ? 'Enviando...' : !canSubmit ? `Esperar ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s` : 'Enviar Formulario'}
          </button>
        </form>

        {/* Mostrar el mensaje de éxito o error */}
        {message && (
          <div className="mt-4 text-center p-2 rounded-md bg-green-100 text-green-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioSatisfaccionUsuario;
