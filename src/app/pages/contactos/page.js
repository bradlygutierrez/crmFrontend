// Contacto.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';
import FormPopup from '@/app/components/FormPopupContacto';
import EditCreateButton from '@/app/components/CreateButton';

export default function Contacto() {
  const [contactos, setContactos] = useState([]);
  const [selectedContacto, setSelectedContacto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function fetchContactos() {
      const response = await fetch('http://localhost:8000/contactos');
      const data = await response.json();
      setContactos(data);
    }

    fetchContactos();
  }, []);

  const handleRowClick = (contacto) => {
    setSelectedContacto(contacto);
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setSelectedContacto(null);
    setIsCreating(true);
  };

  const handleEditSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/contactos/${selectedContacto.id_contacto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      const updatedContacto = await response.json();
      setContactos((prevContactos) => prevContactos.map(cont => cont.id_contacto === updatedContacto.id_contacto ? updatedContacto : cont));
      setIsEditing(false);
      setSelectedContacto(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/contactos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el contacto');
      }
      const newContacto = await response.json();
      setContactos((prevContactos) => [...prevContactos, newContacto]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EditCreateButton 
        nameCreate="Contacto" 
        handleCreate={handleCreateClick} 
        handleEdit={() => setIsEditing(true)} 
      />
      <DataDisplay title="Contactos" data={contactos} onRowClick={handleRowClick} />
      <FormPopup
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        initialValues={selectedContacto}
      />
      <FormPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreateSubmit}
        initialValues={selectedContacto} 
      />
    </div>
  );
}
