// /pages/dashboard.jsx
'use client'
import React from 'react';
import PieChartComponent from '@/app/components/GraficoPacientePorMes';
import BarChartComponent from '@/app/components/GraficoPacienteRegistroMes';
import TicketCounter from '@/app/components/TicketCounter';
import PacienteContador from '@/app/components/PacientesContador';
import PacienteMesContador from '@/app/components/PacientesDelMesContador';
import CitaContador from '@/app/components/CitaContador';
import OportunidadesVentasWidget from '@/app/components/OportunidadesVemtasWidget';
import ExportButtons from '@/app/components/exportButtons';

const Dashboard = () => {
    return (
        <div className="dashboard p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-500">Dashboard de la Clínica</h1>

            <div className="flex-col">
                {/* Primera fila - Contadores principales */}
                <nav className='w-full flex flex-row  h-[30%] mb-6 gap-10'>
                    <div className="h-40 w-fit">
                        <PacienteContador />
                    </div>
                    <div className="h-40 w-fit">
                        <PacienteMesContador />
                    </div>
                    <div className="h-40 w-fit">
                        <CitaContador />
                    </div>
                    <div className="h-40 w-fit">
                        <TicketCounter />
                    </div>
                </nav>

                {/* Segunda fila - Gráfico de pastel y oportunidades de ventas */}

                <nav className='w-full flex flex-row items-end gap-10 mb-11'>
                    <div className="h-auto w-[30%]">
                        <PieChartComponent />
                    </div>
                    <div className=" w-[50%]">
                        <BarChartComponent />
                    </div>
                    <div className="min-h-[24rem] w-[30%] bg-[#FFF8F8] p-4 rounded-xl shadow">
                        <OportunidadesVentasWidget />
                    </div>
                </nav>



                {/* Tercera fila - Gráfico de barras */}

                <div className='w-full flex flex-row'>

                </div>
            </div>

            {/* Botones de exportación */}
            <div className="flex justify-end mt-6 space-x-4">
                <ExportButtons />
            </div>
        </div>
    );
};

export default Dashboard;
