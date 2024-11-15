import React from 'react';

export default function FormPopupPacientes({ isOpen, onClose, onSubmit, initialValues }) {
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
        <h2 className="text-lg font-semibold text-black mb-4">Editar Paciente</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-black">Nombre del Paciente:</label>
            <input
              type="text"
              name="nombre_paciente"
              required
              defaultValue={initialValues ? initialValues.nombre_paciente:''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fecha_nacimiento"
              required
              defaultValue={initialValues ? initialValues.fecha_nacimiento:''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Email del Paciente:</label>
            <input
              type="email"
              name="email_paciente"
              required
              defaultValue={initialValues ? initialValues.email_paciente:''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Teléfono del Paciente:</label>
            <input
              type="tel"
              name="telefono_paciente"
              defaultValue={initialValues ? initialValues.telefono_paciente:''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Fecha de Registro:</label>
            <input
              type="date"
              name="fecha_registro"
              required
              defaultValue={initialValues ? initialValues.fecha_registro:''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Historial Médico:</label>
            <textarea
              name="historial_medico"
              defaultValue={initialValues ? initialValues.historial_medico:''}
              className="border rounded p-2 w-full text-black"
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Nota del Paciente:</label>
            <textarea
              name="nota_paciente"
              defaultValue={initialValues ? initialValues.nota_paciente:''}
              className="border rounded p-2 w-full text-black"
              rows="4"
            />
          </div>
          <div className="col-span-2">
            <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">
              Guardar Cambios
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
