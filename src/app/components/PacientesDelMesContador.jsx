import { useState, useEffect } from 'react';

const PacienteMesContador = () => {
  const [totalPacientes, setTotalPacientes] = useState(0); // Estado para almacenar el total de pacientes
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener el número de pacientes del mes actual
  const obtenerContadorPacientes = async () => {
    try {
      const response = await fetch('http://localhost:8000/pacientes/contar-mes'); // La URL de tu API
      const data = await response.json();

      if (response.ok) {
        setTotalPacientes(data.total_pacientes_mes); // Actualiza el contador
      } else {
        setError('No se pudo obtener el contador de pacientes');
      }
    } catch (error) {
      setError('Hubo un error al obtener los datos');
    } finally {
      setLoading(false); // Finaliza la carga de datos
    }
  };

  // Ejecutamos la función al montar el componente
  useEffect(() => {
    obtenerContadorPacientes();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Contador de Pacientes del Mes</h2>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-800">{totalPacientes}</p>
          <p className="text-gray-500">Pacientes registrados este mes</p>
        </div>
      )}
    </div>
  );
};

export default PacienteMesContador;
