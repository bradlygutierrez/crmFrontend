'use client'
import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';

export default function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function fetchVentas() {
      const response = await fetch('http://localhost:8000/ventas'); // Cambia la URL por tu API real
      const data = await response.json();
      setVentas(data);
    }

    fetchVentas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DataDisplay title="Ventas" data={ventas} />
    </div>
  );
}
