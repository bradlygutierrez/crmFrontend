import { useEffect, useState } from 'react';

const PacienteContador = () => {
    const [totalPacientes, setTotalPacientes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hacer una solicitud GET para obtener el total de pacientes
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/pacientes/contar', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    setTotalPacientes(data.total_pacientes);
                } else {
                    console.error('Error al obtener el total de pacientes');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
            <div>
                <h2 className="text-lg font-semibold">Total de Pacientes Registrados</h2>
                <p className="text-3xl font-bold">{totalPacientes}</p>
            </div>
            <div className="text-4xl text-green-500">
                <i className="fas fa-users"></i> {/* Icono de usuarios */}
            </div>
        </div>
    );
};

export default PacienteContador;
