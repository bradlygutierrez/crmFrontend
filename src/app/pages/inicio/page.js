'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";



export default function Home() {
  const [usuario, setUsuario] = useState(null);

  const obtenerUsuarioLogeado = async () => {
    try {
        const response = await fetch('http://localhost:8000/usuario-logeado', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        if (data) {
            setUsuario(data);
        }
    } catch (error) {
        console.error('Error al obtener el usuario logeado:', error);
    }
  };
  
  useEffect(() => {
    obtenerUsuarioLogeado();
  }, []);
  
  console.log(usuario)
  if (!usuario) {
    return <p>Cargando usuario...</p>;
} 

  const rol = usuario.usuario.rol; 

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenido al CRM de CLIN MED</h1>
          <p className="text-gray-600 mb-8">Gestiona tus clientes, ventas y servicios.</p>
          {rol === "Soporte" && <Link href="/pages/pacientes" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Ver clientes o pacientes
          </Link>}

          {rol === "Propietario" && <Link href="/pages/pacientes" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Ver clientes o pacientes
          </Link>}

          {rol === "Doctor" && <Link href="/pages/pacientes" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Ver clientes o pacientes
          </Link>}

          {rol === "Analista" && <Link href="/pages/pacientes" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Ver clientes o pacientes
          </Link>}
          
        </div>
      </div>
    </div>
    
  );
}
