'use client';
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevenir múltiples envíos
    setIsSubmitting(true);

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Preparar los datos para enviar al backend
    const dataToSend = {
      nombre_usuario: `${formData.nombre} ${formData.apellido}`,
      email_usuario: formData.email,
      contraseña: formData.password,
      rol: 'Paciente' // Puedes cambiar este valor según sea necesario
    };

    try {
      const response = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        setMensaje(result.message);
        setError('');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError(result.message || 'Ocurrió un error al registrar el usuario');
        setMensaje('');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error al conectar con el servidor');
      setMensaje('');
    }
  };

  return (
    <div className="h-screen flex flex-col w-full align-middle">
      <div className="w-full flex flex-col justify-start items-center mb-0 p-0">
        <h1 className="text-gray-600 text-4xl font-bold">Bienvenido a CLIN MED CRM!</h1>
        <div className="w-[7rem] h-[10rem] bg-[url('/clinmed.png')] bg-contain bg-no-repeat bg-center"></div>
      </div>

      <div className="w-full flex justify-center items-center">
        <form className="bg-white shadow-lg p-8 rounded-lg w-1/3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="apellido"
              type="text"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {mensaje && <div className="text-green-600 text-sm">{mensaje}</div>}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
