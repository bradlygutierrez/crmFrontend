// Ventas.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import FormPopup from '@/app/components/FormPopupVentas'; // Asegúrate de que esto apunta a tu componente de formulario
import EditCreateButton from '@/app/components/CreateButton'; // Asegúrate de importar el botón adecuado

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null); // Estado para la fila seleccionada
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el popup de edición
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar el popup de creación

  useEffect(() => {
    async function fetchVentas() {
      const response = await fetch('http://localhost:8000/citas'); // Cambia la URL por tu API real
      const data = await response.json();
      setVentas(data);
    }

    fetchVentas();
  }, []);

  const handleRowClick = (venta) => {
    setSelectedVenta(venta);
    setIsEditing(true); // Abrir el popup de edición
  };

  // Nueva función para manejar la apertura del popup vacío para crear una venta
  const handleCreateClick = () => {
    setSelectedVenta(null); // Asegúrate de que no hay una venta seleccionada
    setIsCreating(true); // Abrir el popup de creación
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/citas/${selectedVenta.id_cita}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedVenta = await response.json();
      // Actualiza la lista de ventas
      setVentas((prevVentas) => prevVentas.map(venta => venta.id_cita === updatedVenta.id_cita ? updatedVenta : venta));
      setIsEditing(false);
      setSelectedVenta(null); // Limpiar la selección
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      // No anides 'data' dentro de otro objeto
      const response = await fetch('http://localhost:8000/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Envía 'data' directamente
      });

      console.log(data); // Agrega esta línea para verificar los datos enviados

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la cita');
      }

      const newVenta = await response.json();
      setVentas((prevVentas) => [...prevVentas, newVenta]);
      setIsCreating(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton
        nameCreate="Cita"
        handleCreate={handleCreateClick}
        handleEdit={() => setIsEditing(true)}
      />
      <DataDisplay title="Citas" data={ventas} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedVenta} // Pasar los valores iniciales al formulario
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedVenta} // Aquí no es necesario, ya que se abre vacío
      />
    </div>
  );
}
