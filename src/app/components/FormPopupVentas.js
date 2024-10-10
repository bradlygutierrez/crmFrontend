import React from 'react';

export default function FormPopupCitas({ isOpen, onClose, onSubmit, initialValues }) {
  if (!isOpen) return null; // Si no está abierto, no renderizar nada

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data); // Pasar los datos del formulario al manejador
    onClose(); // Cerrar el popup después de enviar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-lg font-semibold text-black mb-4">{initialValues ? "Editar Cita" : "Registrar Cita"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-black">Nombre del Paciente:</label>
            <input
              type="text"
              name="nombre_paciente"
              required
              defaultValue={initialValues ? initialValues.nombre_paciente : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Nombre del Servicio:</label>
            <input
              type="text"
              name="nombre_servicio"
              required
              defaultValue={initialValues ? initialValues.nombre_servicio : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Fecha de Cita:</label>
            <input
              type="date"
              name="fecha_cita"
              required
              defaultValue={initialValues ? initialValues.fecha_cita : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Hora de Cita:</label>
            <input
              type="time"
              name="hora_cita"
              required
              defaultValue={initialValues ? initialValues.hora_cita : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-black">Estado de Cita:</label>
            <input
              type="text"
              name="estado_cita"
              required
              defaultValue={initialValues ? initialValues.estado_cita : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div className="col-span-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {initialValues ? "Guardar Cambios" : "Registrar Cita"}
            </button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
