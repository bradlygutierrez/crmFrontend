import * as XLSX from "xlsx-js-style"; // Usando xlsx-js-style para compatibilidad con estilos
import { saveAs } from "file-saver";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Obtener datos de los widgets desde la API
const getWidgetsData = async () => {
  const oportunidadesResponse = await fetch("http://localhost:8000/pacientes/chequeos-pendientes");
  const oportunidadesData = await oportunidadesResponse.json();

  const totalPacientesResponse = await fetch("http://localhost:8000/pacientes/contar");
  const totalPacientesData = await totalPacientesResponse.json();

  const pacientesMesResponse = await fetch("http://localhost:8000/pacientes/contar-mes");
  const pacientesMesData = await pacientesMesResponse.json();

  const ticketsResponse = await fetch("http://localhost:8000/tickets/pendientes");
  const ticketsData = await ticketsResponse.json();

  const citasResponse = await fetch("http://localhost:8000/citas/contar");
  const citasData = await citasResponse.json();

  const citasPorMesResponse = await fetch("http://localhost:8000/pacientes-citas");
  const citasPorMesData = await citasPorMesResponse.json();

  const pacientesRegistrosResponse = await fetch("http://localhost:8000/pacientes-registros");
  const pacientesRegistrosData = await pacientesRegistrosResponse.json();

  return {
    oportunidades: oportunidadesData,
    totalPacientes: totalPacientesData.total_pacientes,
    pacientesMes: pacientesMesData.total_pacientes_mes,
    ticketsPendientes: ticketsData.totalPendientes,
    citas: citasData.total_citas_mes,
    citasPorMes: citasPorMesData.pacientesConCitaMes,
    pacientesRegistros: pacientesRegistrosData,
  };
};


// Exportar a PDF
const exportToPDF = async () => {
    const data = await getWidgetsData();
    const doc = new jsPDF();
  
    // Agregar logotipo y encabezado
    const imgPath = "/clinmed.jfif"; // Ruta del logotipo en la carpeta public
    doc.addImage(imgPath, "PNG", 10, 10, 50, 20); // Ajustar posición y tamaño según sea necesario
    doc.setFontSize(16);
    doc.text("CLIN MED NICARAGUA", 70, 15);
    doc.setFontSize(12);
    doc.text("LABORATORIO CLÍNICO", 70, 22);
    doc.setFont("normal");
    doc.text("Confianza, seguridad y tranquilidad en tus resultados!", 70, 30);
  
    // Agregar título del reporte
    doc.setFontSize(14);
    doc.text("Reporte de Widgets", 10, 50);
  
    // Generar tabla de oportunidades
    autoTable(doc, {
      startY: 60,
      head: [["No.", "Paciente", "Última Cita"]],
      body: data.oportunidades.map((item, index) => [
        index + 1,
        item.nombre_paciente,
        item.dias_desde_ultima_cita || "No registrada",
      ]),
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      bodyStyles: { fontSize: 10 },
    });
  
    // Generar tabla con datos de los pacientes registrados (meses)
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Mes", "Total Pacientes"]],
      body: data.pacientesRegistros.map((item) => [
        new Date(item.year, item.month - 1).toLocaleString("es-ES", { month: "long" }) + `-${item.year}`,
        item.totalPacientes,
      ]),
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      bodyStyles: { fontSize: 12 },
    });
  
    // Generar tabla con datos generales
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Total Pacientes", "Pacientes del Mes", "Tickets Pendientes", "Citas Registradas", "Citas por Mes"]],
      body: [
        [
          data.totalPacientes,
          data.pacientesMes,
          data.ticketsPendientes,
          data.citas,
          data.citasPorMes,
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      bodyStyles: { fontSize: 12 },
    });
  
    // Descargar el archivo PDF
    doc.save("widgets-report.pdf");
  };
  
  
  
// Exportar a Excel
const exportToExcel = async () => {
  const data = await getWidgetsData();

  const workbook = XLSX.utils.book_new();

  // Crear hoja de portada
  const portada = [
    ["CLIN MED NICARAGUA"],
    ["LABORATORIO CLÍNICO"],
    ["Confianza, seguridad y tranquilidad en tus resultados!"],
    [],
    ["Reporte General"],
    ["Total Pacientes", data.totalPacientes],
    ["Pacientes del Mes", data.pacientesMes],
    ["Tickets Pendientes", data.ticketsPendientes],
    ["Citas Registradas", data.citas],
    ["Citas por Mes", data.citasPorMes],
  ];
  const portadaSheet = XLSX.utils.aoa_to_sheet(portada);

  // Estilo de la portada (similar al PDF)
  portadaSheet["!cols"] = [
    { wpx: 350 }, // Ajustar la anchura de las columnas para la portada
  ];

  // Estilo de la portada
  for (let R = 0; R < portada.length; R++) {
    for (let C = 0; C < 1; C++) {
      const address = { r: R, c: C };
      const cell = XLSX.utils.encode_cell(address);
      if (!portadaSheet[cell]) portadaSheet[cell] = {};

      if (R === 0) {
        // Título "CLIN MED NICARAGUA"
        portadaSheet[cell].s = {
          font: { bold: true, size: 20, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "22A083" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
        };
      } else if (R === 1) {
        // Subtítulo "LABORATORIO CLÍNICO"
        portadaSheet[cell].s = {
          font: { bold: true, size: 16, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "22A083" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
        };
      } else if (R === 2) {
        // Texto adicional
        portadaSheet[cell].s = {
          font: { italic: true, size: 14, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "22A083" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
        };
      } else {
        portadaSheet[cell].s = {
          font: { size: 12 },
          alignment: { horizontal: "left", vertical: "center" },
        };
      }
    }
  }

  XLSX.utils.book_append_sheet(workbook, portadaSheet, "Portada");

  // Crear hoja de Oportunidades
  const oportunidades = [
    ["No", "Paciente", "Última Cita"],
    ...data.oportunidades.map((item, index) => [index + 1, item.nombre_paciente, item.dias_desde_ultima_cita || "No registrada"]),
  ];
  const oportunidadesSheet = XLSX.utils.aoa_to_sheet(oportunidades);

  // Ajustar el ancho de las columnas de Oportunidades
  oportunidadesSheet["!cols"] = [
    { wpx: 30 },  // Ancho para la columna "No"
    { wpx: 150 }, // Ancho para la columna "Paciente"
    { wpx: 100 }, // Ancho para la columna "Última Cita"
  ];

  // Aplicar estilos a la hoja de Oportunidades
  for (let R = 0; R < oportunidades.length; R++) {
    for (let C = 0; C < 3; C++) {
      const address = { r: R, c: C };
      const cell = XLSX.utils.encode_cell(address);
      if (R === 0) {
        // Cabecera
        if (!oportunidadesSheet[cell]) oportunidadesSheet[cell] = {};
        Object.assign(oportunidadesSheet[cell], {
          s: {
            font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "22A083" } },
            border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
            alignment: { horizontal: "center", vertical: "center" },
          },
        });
      } else {
        if (!oportunidadesSheet[cell]) oportunidadesSheet[cell] = {};
        Object.assign(oportunidadesSheet[cell], {
          s: {
            font: { size: 12 },
            border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
            alignment: { horizontal: "center", vertical: "center" },
          },
        });
      }
    }
  }
  XLSX.utils.book_append_sheet(workbook, oportunidadesSheet, "Oportunidades");

  // Crear hoja de Pacientes por Mes
  const pacientesPorMes = [
    ["Mes", "Total Pacientes"],
    ...data.pacientesRegistros.map(item => [`${new Date(item.year, item.month - 1).toLocaleString('es-ES', { month: 'long' })}-${item.year}`, item.totalPacientes]),
  ];
  const pacientesPorMesSheet = XLSX.utils.aoa_to_sheet(pacientesPorMes);

  // Ajustar el ancho de las columnas de Pacientes por Mes
  pacientesPorMesSheet["!cols"] = [
    { wpx: 120 }, // Ancho para la columna "Mes"
    { wpx: 100 }, // Ancho para la columna "Total Pacientes"
  ];

  // Aplicar estilos a la hoja de Pacientes por Mes
  for (let R = 0; R < pacientesPorMes.length; R++) {
    for (let C = 0; C < 2; C++) {
      const address = { r: R, c: C };
      const cell = XLSX.utils.encode_cell(address);
      if (R === 0) {
        // Cabecera
        if (!pacientesPorMesSheet[cell]) pacientesPorMesSheet[cell] = {};
        Object.assign(pacientesPorMesSheet[cell], {
          s: {
            font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "22A083" } },
            border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
            alignment: { horizontal: "center", vertical: "center" },
          },
        });
      } else {
        if (!pacientesPorMesSheet[cell]) pacientesPorMesSheet[cell] = {};
        Object.assign(pacientesPorMesSheet[cell], {
          s: {
            font: { size: 12 },
            border: { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, bottom: { style: "thin" } },
            alignment: { horizontal: "center", vertical: "center" },
          },
        });
      }
    }
  }
  XLSX.utils.book_append_sheet(workbook, pacientesPorMesSheet, "Pacientes por Mes");

  // Descargar el archivo Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "widgets-report.xlsx");
};

// Botones de exportación
const ExportButtons = () => {
  return (
    <div className="flex gap-4 mt-4">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded shadow"
        onClick={exportToPDF}
      >
        Exportar a PDF
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded shadow"
        onClick={exportToExcel}
      >
        Exportar a Excel
      </button>
    </div>
  );
};

export default ExportButtons;
