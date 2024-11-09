import React from 'react';

export default function FormPopupTickets({ isOpen, onClose, onSubmit, initialValues }) {
  if (!isOpen) return null; // Si no está abierto, no renderizar nada

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
        <h2 className="text-lg font-semibold text-black mb-4">Crear Cita</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-black">id_usuario:</label>
            <input
              type="number"
              name="id_usuario"
              required
              defaultValue={initialValues ? initialValues.id_usuario : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-black">Titulo</label>
            <input
              type="text"
              name="titulo"
              required
              defaultValue={initialValues ? initialValues.titulo : ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              required
              defaultValue={initialValues ? initialValues.descripcion : ''}
              className="border rounded p-2 w-full text-black"
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
