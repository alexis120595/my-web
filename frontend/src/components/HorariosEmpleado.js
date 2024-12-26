import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Importa los estilos de Tailwind CSS

const HorariosEmpleado = ({ onHorariosChange, barberoId }) => { // Agregar barberoId como prop
  const [horarios, setHorarios] = useState([
    { dia: "lun", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "mar", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "mie", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "jue", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "vie", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "sab", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] },
    { dia: "dom", horarios: [{ horaApertura: "09:00", horaCierre: "17:00" }] }
  ]);

  const [checkboxes, setCheckboxes] = useState({
    lun: true,
    mar: true,
    mie: true,
    jue: true,
    vie: true,
    sab: true,
    dom: true
  });

  const opcionesHora = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '01:00 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '17:00', label: '05:00 PM' },
  ];

  const agregarHorario = (dia) => {
    setHorarios(horarios.map(horario => 
      horario.dia === dia 
        ? { ...horario, horarios: [...horario.horarios, { horaApertura: "09:00", horaCierre: "17:00" }] }
        : horario
    ));
  };

  const handleCheckboxChange = (dia) => {
    setCheckboxes({
      ...checkboxes,
      [dia]: !checkboxes[dia]
    });
  };

  // Función para agrupar horarios por día
  const agruparHorariosPorDia = (horarios) => {
    const dias = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
    const horariosPorDia = dias.map(dia => ({
      dia,
      horarios: horarios
        .filter(hr => hr.dia === dia)
        .map(hr => ({ horaApertura: hr.horaApertura, horaCierre: hr.horaCierre }))
    }));
    return horariosPorDia;
  };

  useEffect(() => {
    if (barberoId) { // Verificar que barberoId esté disponible
      // Fetch horarios del backend para el barbero seleccionado
      axios.get(`http://localhost:8000/horarios?barbero_id=${barberoId}`)
        .then(response => {
          const horariosAgrupados = agruparHorariosPorDia(response.data);
          setHorarios(horariosAgrupados);
        })
        .catch(err => {
          console.error('Error al obtener los horarios:', err);
        });
    }
  }, [barberoId]);

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
            <div className="flex flex-col sm:flex-col sm:items-start mb-4 md:mb-0">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              {/* Horarios */}
              <div className="flex flex-wrap items-center mb-4 sm:mb-0">
                {horarioDia.horarios.map((horario, indexHorario) => (
                  <div key={indexHorario} className="flex items-center mb-2 sm:mb-0 sm:mr-4">
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
                      style={{ width: '120px', height: '40px' }}
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
                      style={{ width: '120px', height: '40px' }}
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
                className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD000] text-[#212121] hover:bg-yellow-400 transition-colors duration-200"
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
          width: 40px;
          height: 24px;
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
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
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
          transform: translateX(16px);
        }
      `}</style>
    </div>
  );
}

export default HorariosEmpleado;