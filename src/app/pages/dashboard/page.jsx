// /pages/dashboard.jsx
'use client'
import React from 'react';
import PieChartComponent from '@/app/components/GraficoPacientePorMes';
import BarChartComponent from '@/app/components/GraficoPacienteRegistroMes';
import TicketCounter from '@/app/components/TicketCounter';
import PacienteContador from '@/app/components/PacientesContador';
import PacienteMesContador from '@/app/components/PacientesDelMesContador';
import CitaContador from '@/app/components/CitaContador';

const Dashboard = () => {
    return (
        <div className="dashboard p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard de la Clínica</h1>
            
            <div className="grid grid-cols-4 gap-4">
                {/* Primera fila - Contadores principales */}
                <div className="col-span-1 bg-white p-4 rounded shadow">
                    <PacienteContador />
                </div>
                <div className="col-span-1 bg-white p-4 rounded shadow">
                    <PacienteMesContador />
                </div>
                <div className="col-span-1 bg-white p-4 rounded shadow">
                    <CitaContador />
                </div>
                <div className="col-span-1 bg-white p-4 rounded shadow">
                    <TicketCounter />
                </div>

                {/* Segunda fila - Gráfico de pastel y oportunidades de ventas */}
                <div className="col-span-2 bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Citas</h2>
                    <PieChartComponent />
                </div>
                <div className="col-span-2 bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Oportunidades de ventas (pacientes con un año sin volver)</h2>
                    <ul className="text-gray-700">
                        <li>Paciente: José, checkeo en: 2 Días</li>
                        <li>Paciente: Ana, checkeo en: 3 Días</li>
                        <li>Paciente: Ana, checkeo en: 5 Días</li>
                        <li>Paciente: Ana, checkeo en: 4 Días</li>
                    </ul>
                </div>

                {/* Tercera fila - Gráfico de barras */}
                <div className="col-span-4 bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Pacientes por mes</h2>
                    <BarChartComponent />
                </div>
            </div>

            {/* Botones de exportación */}
            <div className="flex justify-end mt-6 space-x-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">Exportar Reporte Como PDF</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">Exportar Reporte Como Excel</button>
            </div>
        </div>
    );
};

export default Dashboard;
