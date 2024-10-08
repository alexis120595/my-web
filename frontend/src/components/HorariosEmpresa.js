import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css'; // Importa los estilos de Tailwind CSS

const HorariosEmpresa = ({ onHorariosChange }) => {
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

  useEffect(() => {
    const horariosFiltrados = horarios.filter(horario => checkboxes[horario.dia]);
    onHorariosChange(horariosFiltrados);
  }, [horarios, checkboxes, onHorariosChange]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Horarios de Atención</h1>
      {horarios.map((horarioDia, indexDia) => (
        <div key={indexDia} className="mb-4">
          <div className="flex items-center">
        
        <label className="switch">
          <input 
            type="checkbox" 
            id={horarioDia.dia} 
            name={horarioDia.dia} 
            value={horarioDia.dia} 
            className="mr-2" 
            checked={checkboxes[horarioDia.dia]} 
            onChange={() => handleCheckboxChange(horarioDia.dia)} 
          />
          <span className="slider round"></span>
          </label>
          <label htmlFor={horarioDia.dia} className="mr-4">{horarioDia.dia.charAt(0).toUpperCase() + horarioDia.dia.slice(1)}</label>
          {horarioDia.horarios.map((horario, indexHorario) => (
            <div key={indexHorario} className="flex items-center mb-2">
              <select id={`horaApertura${horarioDia.dia}${indexHorario}`} name={`horaApertura${horarioDia.dia}${indexHorario}`} value={horario.horaApertura} onChange={(e) => {
                const newHorarios = [...horarios];
                newHorarios[indexDia].horarios[indexHorario].horaApertura = e.target.value;
                setHorarios(newHorarios);
              }} className="mr-2 p-1 border rounded-full ">
                {opcionesHora.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
              <select id={`horaCierre${horarioDia.dia}${indexHorario}`} name={`horaCierre${horarioDia.dia}${indexHorario}`} value={horario.horaCierre} onChange={(e) => {
                const newHorarios = [...horarios];
                newHorarios[indexDia].horarios[indexHorario].horaCierre = e.target.value;
                setHorarios(newHorarios);
              }} className="p-1 border rounded-full">
                {opcionesHora.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        <button 
  onClick={() => agregarHorario(horarioDia.dia)} 
  className="flex items-center justify-center bg-yellow-500 text-black w-7 h-7 rounded-full ml-4 "
>
  +
</button>
        </div>

        </div>
      ))}
    </div>
  );
}

export default HorariosEmpresa;