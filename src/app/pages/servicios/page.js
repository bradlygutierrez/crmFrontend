// Productos.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import FormPopup from '@/app/components/FormPopupProductos'; // Asegúrate de que esto apunta a tu componente de formulario
import EditCreateButton from '@/app/components/CreateButton'; // Asegúrate de importar el botón adecuado

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null); // Estado para la fila seleccionada
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el popup de edición
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar el popup de creación

  useEffect(() => {
    async function fetchProductos() {
      const response = await fetch('http://localhost:8000/servicios'); // Cambia la URL por tu API real
      const data = await response.json();
      setProductos(data);
    }

    fetchProductos();
  }, []);

  const handleRowClick = (producto) => {
    setSelectedProducto(producto);
    setIsEditing(true); // Abrir el popup de edición
  };

  // Nueva función para manejar la apertura del popup vacío para crear un producto
  const handleCreateClick = () => {
    setSelectedProducto(null); // Asegúrate de que no hay un producto seleccionado
    setIsCreating(true); // Abrir el popup de creación
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/servicios/${selectedProducto.id_servicio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedProducto = await response.json();
      // Actualiza la lista de productos
      setProductos((prevProductos) => prevProductos.map(producto => producto.id_servicio === updatedProducto.id_servicio ? updatedProducto : producto));
      setIsEditing(false);
      setSelectedProducto(null); // Limpiar la selección
      window.location.reload(); // Recargar para mostrar el cambio

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el servicios');
      }
      const newProducto = await response.json();
      // Agregar el nuevo producto a la lista
      setProductos((prevProductos) => [...prevProductos, newProducto]);
      setIsCreating(false); // Cerrar el popup
      window.location.reload(); // Recargar para mostrar el cambio
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton 
        nameCreate="Servicio" 
        handleCreate={handleCreateClick} 
        handleEdit={() => setIsEditing(true)} 
      />
      <DataDisplay title="Servicios" data={productos} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedProducto} // Pasar los valores iniciales al formulario
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedProducto} // Aquí no es necesario, ya que se abre vacío
      />
    </div>
  );
}
