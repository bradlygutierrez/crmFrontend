// Ventas.js
'use client';
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';

export default function CituasUsaurio() {
  const [citas, setCitas] = useState([]);
 
  useEffect(() => {
    async function fetchCitas() {
      const response = await fetch('http://localhost:8000/citas/usuario',{
        credentials: 'include',
      }); // Cambia la URL por tu API real
      const data = await response.json();
      setCitas(data);
      
    }

    fetchCitas();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DataDisplay title="Citas" data={citas} />
    </div>
  );
}
