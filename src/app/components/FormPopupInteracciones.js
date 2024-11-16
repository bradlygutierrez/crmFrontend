import React, { useState, useEffect } from 'react';

export default function FormPopupInteracciones({ isOpen, onClose, onSubmit, initialValues }) {
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar datos al abrir el popup
  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:8000/pacientes')
        .then((res) => res.json())
        .then(setPacientes)
        .catch((err) => console.error("Error cargando pacientes:", err));

      fetch('http://localhost:8000/usuarios')
        .then((res) => res.json())
        .then(setUsuarios)
        .catch((err) => console.error("Error cargando usuarios:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null; // No renderizar nada si el popup no está abierto

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data); // Pasar los datos del formulario al manejador
    console.log(data)
    onClose(); // Cerrar el popup después de enviar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-lg font-semibold text-black mb-4">Editar Interacción</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-black">Nombre del Paciente:</label>
            <select
              name="nombre_paciente"
              required
              defaultValue={initialValues?.nombre_paciente || ''}
              className="border rounded p-2 w-full text-black"
            >
              <option value="" disabled>Selecciona un paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.nombre_paciente} value={paciente.nombre_paciente}>
                  {paciente.nombre_paciente}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-black">Fecha de Interacción:</label>
            <input
              type="date"
              name="fecha_interaccion"
              required
              defaultValue={initialValues?.fecha_interaccion || ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Nota de Interacción:</label>
            <textarea
              name="nota_interaccion"
              required
              defaultValue={initialValues?.nota_interaccion || ''}
              className="border rounded p-2 w-full text-black"
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Tipo de Interacción:</label>
            <select
              name="nombre_tipoInteraccion"
              required
              defaultValue={initialValues?.nombre_tipoInteraccion || ''}
              className="border rounded p-2 w-full text-black"
            >
              <option value="" disabled>Selecciona un tipo</option>
              <option value="consulta">Consulta</option>
              <option value="urgente">Urgente</option>
              <option value="seguimiento">Seguimiento</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-black">Nombre de Usuario:</label>
            <select
              name="nombre_usuario"
              required
              defaultValue={initialValues?.nombre_usuario || ''}
              className="border rounded p-2 w-full text-black"
            >
              <option value="" disabled>Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.nombre_usuario} value={usuario.nombre_usuario}>
                  {usuario.nombre_usuario}
                </option>
              ))}
            </select>
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
