'use client'
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchClientes() {
      const response = await fetch('http://localhost:8000/clientes'); // Cambia la URL por tu API real
      const data = await response.json();
      setClientes(data);
    }

    fetchClientes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DataDisplay title="Clientes" data={clientes} />
    </div>
  );
}
