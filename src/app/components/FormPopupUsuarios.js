'use client';
import React, { useEffect } from 'react';

export default function FormPopupUsuarios({ isOpen, onClose, onSubmit, initialValues }) {
    if (!isOpen) return null; // No renderizar nada si el popup no está abierto

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmit(data); // Pasar los datos del formulario al manejador
        console.log(data);
        onClose(); // Cerrar el popup después de enviar
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
                <h2 className="text-lg font-semibold text-black mb-4">
                    {initialValues ? 'Editar Usuario' : 'Crear Usuario'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre de Usuario */}
                    <div>
                        <label className="block mb-2 text-black">Nombre de Usuario:</label>
                        <input
                            type="text"
                            name="nombre_usuario"
                            required
                            defaultValue={initialValues?.nombre_usuario || ''}
                            className="border rounded p-2 w-full text-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-black">Email:</label>
                        <input
                            type="email"
                            name="email_usuario"
                            required
                            defaultValue={initialValues?.email_usuario || ''}
                            className="border rounded p-2 w-full text-black"
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block mb-2 text-black">Contraseña:</label>
                        <input
                            type="password"
                            name="contraseña"
                            required={!initialValues} // Solo requerido en creación
                            placeholder={initialValues ? 'Dejar en blanco para no cambiar' : ''}
                            className="border rounded p-2 w-full text-black"
                        />
                    </div>

                    {/* Rol */}
                    <div>
                        <label className="block mb-2 text-black">Rol:</label>
                        <select
                            name="rol"
                            required
                            defaultValue={initialValues?.rol || ''}
                            className="border rounded p-2 w-full text-black"
                        >
                            <option value="" disabled>Selecciona un rol</option>
                            <option value="Analista">Analista</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Soporte">Soporte</option>
                            <option value="Paciente">Paciente</option>
                            <option value="Propietario">Propietario</option>
                        </select>
                    </div>

                    {/* Botones */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {initialValues ? 'Guardar Cambios' : 'Crear Usuario'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
