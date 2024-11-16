import React, { useState, useEffect } from 'react';

export default function FormPopupContacto({ isOpen, onClose, onSubmit, initialValues }) {
  const [empresas, setEmpresas] = useState([]);

  // Cargar empresas al abrir el popup
  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:8000/empresas')
        .then((res) => res.json())
        .then(setEmpresas)
        .catch((err) => console.error("Error cargando empresas:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null; // No renderizar nada si el popup no está abierto

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
        <h2 className="text-lg font-semibold text-black mb-4">Editar Contacto</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-black">Nombre:</label>
            <input
              type="text"
              name="nombre_contacto"
              required
              defaultValue={initialValues?.nombre_contacto || ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Teléfono:</label>
            <input
              type="tel"
              name="telefono_contacto"
              required
              defaultValue={initialValues?.telefono_contacto || ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Email:</label>
            <input
              type="email"
              name="email_contacto"
              required
              defaultValue={initialValues?.email_contacto || ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Cargo:</label>
            <input
              type="text"
              name="cargo"
              required
              defaultValue={initialValues?.cargo || ''}
              className="border rounded p-2 w-full text-black"
            />
          </div>
          <div>
            <label className="block mb-2 text-black">Nombre de la Empresa:</label>
            <select
              name="nombre_empresa"
              required
              defaultValue={initialValues?.nombre_empresa || ''}
              className="border rounded p-2 w-full text-black"
            >
              <option value="" disabled>Selecciona una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id_empresa} value={empresa.nombre_empresa}>
                  {empresa.nombre_empresa}
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
