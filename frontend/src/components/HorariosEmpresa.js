// Archivo que permite definir los horarios de atención de la empresa
import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css'; 

const HorariosEmpresa = ({ onHorariosChange }) => {
  // Estado para los horarios de la empresa
  const [horarios, setHorarios] = useState([
    { dia: "lun", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "mar", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "mie", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "jue", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "vie", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "sab", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "dom", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] }
  ]);
// Estado para los checkboxes de los días
  const [checkboxes, setCheckboxes] = useState({
    lun: true,
    mar: true,
    mie: true,
    jue: true,
    vie: true,
    sab: true,
    dom: true
  });
// Opciones de hora para el select
  const opcionesHora = [
    { value: '09:00', label: '09:00 ' },
    { value: '10:00', label: '10:00 ' },
    { value: '11:00', label: '11:00 ' },
    { value: '12:00', label: '12:00 ' },
    { value: '13:00', label: '01:00 ' },
    { value: '14:00', label: '02:00 ' },
    { value: '15:00', label: '03:00 ' },
    { value: '16:00', label: '04:00 ' },
    { value: '17:00', label: '05:00 ' },
  ];
// Función para agregar un horario a un día
  const agregarHorario = (dia) => {
    setHorarios(horarios.map(horario => 
      horario.dia === dia 
        ? { ...horario, horarios: [...horario.horarios, { horaApertura: "09:00", horaCierre: "17:00" }] }
        : horario
    ));
  };
// Función para manejar el cambio de los checkboxes
  const handleCheckboxChange = (dia) => {
    setCheckboxes({
      ...checkboxes,
      [dia]: !checkboxes[dia]
    });
  };
// Efecto para filtrar los horarios según los checkboxes
  useEffect(() => {
    const horariosFiltrados = horarios.filter(horario => checkboxes[horario.dia]);
    onHorariosChange(horariosFiltrados);
  }, [horarios, checkboxes, onHorariosChange]);

  return (
    <div className="p-4">
      
      {horarios.map((horarioDia, indexDia) => (
        <div key={indexDia} className="mb-6">
          {/* Contenedor del Día y Switch en Columnas */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Nombre del Día y Switch */}
            <div className="flex flex-col sm:flex-col sm:items-start mb-4 md:mb-0 mr-10">
              {/* Nombre del Día */}
              <span className="font-poppins text-sm mb-2">
                {horarioDia.dia.charAt(0).toUpperCase() + horarioDia.dia.slice(1)}
              </span>
              {/* Switch */}
              <label className="switch">
                <input 
                  type="checkbox" 
                  id={horarioDia.dia} 
                  name={horarioDia.dia} 
                  value={horarioDia.dia} 
                  checked={checkboxes[horarioDia.dia]} 
                  onChange={() => handleCheckboxChange(horarioDia.dia)} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            {/* Contenedor de Horarios y Botón */}
            <div className="flex flex-row items-start">
              {/* Horarios */}
              <div className="flex flex-col items-start">
                {horarioDia.horarios.map((horario, indexHorario) => (
                  <div key={indexHorario} className="flex items-center mb-2">
                    {/* Horario de Apertura y Cierre */}
                    <select 
                      id={`horaApertura${horarioDia.dia}${indexHorario}`} 
                      name={`horaApertura${horarioDia.dia}${indexHorario}`} 
                      value={horario.horaApertura} 
                      onChange={(e) => {
                        const newHorarios = [...horarios];
                        newHorarios[indexDia].horarios[indexHorario].horaApertura = e.target.value;
                        setHorarios(newHorarios);
                      }} 
                      className="mr-2 p-2 border rounded-full text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      style={{ width: '90px', height: '40px' }}
                    >
                      
                      {opcionesHora.map((opcion) => (
                        <option key={opcion.value} value={opcion.value} className="text-black">
                          {opcion.label}
                        </option>
                      ))}
                    </select>
                    
                    <select 
                      id={`horaCierre${horarioDia.dia}${indexHorario}`} 
                      name={`horaCierre${horarioDia.dia}${indexHorario}`} 
                      value={horario.horaCierre} 
                      onChange={(e) => {
                        const newHorarios = [...horarios];
                        newHorarios[indexDia].horarios[indexHorario].horaCierre = e.target.value;
                        setHorarios(newHorarios);
                      }} 
                      className="p-2 border rounded-full text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      style={{ width: '90px', height: '40px' }}
                    >
                      {opcionesHora.map((opcion) => (
                        <option key={opcion.value} value={opcion.value} className="text-black">
                          {opcion.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Botón para Agregar Horario */}
              <button 
                type="button"
                onClick={() => agregarHorario(horarioDia.dia)} 
                className="ml-10 flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD000] text-[#212121] hover:bg-yellow-400 transition-colors duration-200  text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Estilos del Switch */}
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 30px;
          height: 18px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 18px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #60D669;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #60D669;
        }

        input:checked + .slider:before {
          transform: translateX(12px);
        }
      `}</style>
    </div>
  );
}

export default HorariosEmpresa;