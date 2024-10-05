'use client'

import { useEffect, useState } from 'react';
import DataDisplay from '@/app/components/dataDisplay';

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      const response = await fetch('http://localhost:8000/productos'); // Cambia la URL por tu API real
      const data = await response.json();
      setProductos(data);
    }

    fetchProductos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DataDisplay title="Productos" data={productos} />
    </div>
  );
}
