import { useState, useEffect } from 'react';

const CitaContador = () => {
  const [totalCitas, setTotalCitas] = useState(0); // Estado para almacenar el total de citas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener el número de citas del mes actual
  const obtenerContadorCitas = async () => {
    try {
      const response = await fetch('http://localhost:8000/citas/contar'); // La URL de tu API
      const data = await response.json();

      if (response.ok) {
        setTotalCitas(data.total_citas_mes); // Actualiza el contador
      } else {
        setError('No se pudo obtener el contador de citas');
      }
    } catch (error) {
      setError('Hubo un error al obtener los datos');
    } finally {
      setLoading(false); // Finaliza la carga de datos
    }
  };

  // Ejecutamos la función al montar el componente
  useEffect(() => {
    obtenerContadorCitas();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Contador de Citas del Mes</h2>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-800">{totalCitas}</p>
          <p className="text-gray-500">Citas registradas este mes</p>
        </div>
      )}
    </div>
  );
};

export default CitaContador;
