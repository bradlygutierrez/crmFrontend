// Formulario.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import FormPopup from '@/app/components/FormPopupFormulario';
import EditCreateButton from '@/app/components/CreateButton';

export default function Formulario() {
  const [formularios, setFormularios] = useState([]);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function fetchFormularios() {
      const response = await fetch('http://localhost:8000/formularios');
      const data = await response.json();
      setFormularios(data);
    }

    fetchFormularios();
  }, []);

  const handleRowClick = (formulario) => {
    setSelectedFormulario(formulario);
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setSelectedFormulario(null);
    setIsCreating(true);
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/formularios/${selectedFormulario.id_formulario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedFormulario = await response.json();
      setFormularios((prevFormularios) => prevFormularios.map(form => form.id_formulario === updatedFormulario.id_formulario ? updatedFormulario : form));
      setIsEditing(false);
      setSelectedFormulario(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/formularios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el formulario');
      }
      const newFormulario = await response.json();
      setFormularios((prevFormularios) => [...prevFormularios, newFormulario]);
      setIsCreating(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton 
        nameCreate="Formulario" 
        handleCreate={handleCreateClick} 
        handleEdit={() => setIsEditing(true)} 
      />
      <DataDisplay title="Formularios" data={formularios} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedFormulario}
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedFormulario} 
      />
    </div>
  );
}
