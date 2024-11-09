// Empresa.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import FormPopup from '@/app/components/FormPopupEmpresa'; // Asegúrate de que esto apunta a tu componente de formulario
import EditCreateButton from '@/app/components/CreateButton'; // Asegúrate de importar el botón adecuado

export default function Empresa() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function fetchEmpresas() {
      const response = await fetch('http://localhost:8000/empresas'); // Cambia la URL por tu API real
      const data = await response.json();
      setEmpresas(data);
    }

    fetchEmpresas();
  }, []);

  const handleRowClick = (empresa) => {
    setSelectedEmpresa(empresa);
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setSelectedEmpresa(null);
    setIsCreating(true);
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/empresas/${selectedEmpresa.id_empresa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedEmpresa = await response.json();
      setEmpresas((prevEmpresas) => prevEmpresas.map(emp => emp.id_empresa === updatedEmpresa.id_empresa ? updatedEmpresa : emp));
      setIsEditing(false);
      setSelectedEmpresa(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/empresas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear la empresa');
      }
      const newEmpresa = await response.json();
      setEmpresas((prevEmpresas) => [...prevEmpresas, newEmpresa]);
      setIsCreating(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton 
        nameCreate="Empresa" 
        handleCreate={handleCreateClick} 
        handleEdit={() => setIsEditing(true)} 
      />
      <DataDisplay title="Empresas" data={empresas} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedEmpresa}
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedEmpresa} 
      />
    </div>
  );
}
