'use client';
import React from 'react';
import * as XLSX from 'xlsx-js-style'; // Asegúrate de instalar xlsx-js-style
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function PacientesExportButtons({ data }) {

  // Lógica para exportar a Excel con estilo
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    // Definir el estilo para la hoja de Excel
    worksheet['!cols'] = [
      { wpx: 100 }, // Ancho de la columna "ID"
      { wpx: 150 }, // Ancho de la columna "Nombre"
      { wpx: 150 }, // Ancho de la columna "Fecha Nacimiento"
      { wpx: 150 }, // Ancho de la columna "Email"
      { wpx: 100 }, // Ancho de la columna "Teléfono"
      { wpx: 150 }, // Ancho de la columna "Fecha Registro"
      { wpx: 200 }, // Ancho de la columna "Historial"
      { wpx: 150 }, // Ancho de la columna "Nota"
    ];

    // Estilo de las celdas de la cabecera
    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' }, size: 12 },
      fill: { fgColor: { rgb: '22A083' } },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' } },
    };

    // Aplicar estilo a la cabecera
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; C++) {
      const address = { r: 0, c: C };
      const cell = XLSX.utils.encode_cell(address);
      if (!worksheet[cell]) worksheet[cell] = {};
      worksheet[cell].s = headerStyle;
    }

    // Añadir la hoja de "Pacientes" al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, 'Pacientes.xlsx');
  };

  // Lógica para exportar a PDF con estilo
  const exportToPDF = () => {
    const doc = new jsPDF();
     // Agregar logotipo y encabezado
    const imgPath = "/clinmed.jfif"; // Ruta del logotipo en la carpeta public
    doc.addImage(imgPath, "PNG", 10, 10, 50, 20); // Ajustar posición y tamaño según sea necesario

    // Títulos con espaciado
    doc.setFontSize(16);
    doc.text("CLIN MED NICARAGUA", 70, 15);
    doc.setFontSize(12);
    doc.text("LABORATORIO CLÍNICO", 70, 22);
    doc.setFont("normal");
    doc.text("Confianza, seguridad y tranquilidad en tus resultados!", 70, 30);

    // Pequeño espacio antes de la tabla (ajustamos el valor de startY)
    const tableStartY = 40; // Ajusta este valor para dar más o menos espacio entre el encabezado y la tabla

    const tableColumn = [
      'ID', 'Nombre', 'Fecha Nacimiento', 'Email', 'Teléfono', 'Fecha Registro', 'Historial', 'Nota'
    ];

    const tableRows = data.map(client => [
      client.id_paciente,
      client.nombre_paciente,
      client.fecha_nacimiento,
      client.email_paciente,
      client.telefono_paciente,
      client.fecha_registro,
      client.historial_medico,
      client.nota_paciente,
    ]);

    // Estilo para la tabla en PDF
    doc.autoTable(tableColumn, tableRows, { 
        startY: tableStartY, // Comenzar justo después del encabezado con el pequeño espacio
      headStyles: {
        fillColor: [34, 160, 131], // Color de fondo de la cabecera
        textColor: [255, 255, 255], // Color de texto de la cabecera
        fontSize: 12,
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: {
        fontSize: 10,
        halign: 'center',
      },
      margin: { top: 30 },
    });

    // Descargar el archivo PDF
    doc.save('Pacientes.pdf');
  };

  return (
    <div className="flex space-x-10 mb-6">
      {/* Botón de exportación a PDF */}
      <button 
        className="bg-red-500 text-white py-2 px-4 rounded-md"
        onClick={exportToPDF}>
        Exportar a PDF
      </button>
      
      {/* Botón de exportación a Excel */}
      <button 
        className="bg-green-500 text-white py-2 px-4 rounded-md"
        onClick={exportToExcel}>
        Exportar a Excel
      </button>
    </div>
  );
}
