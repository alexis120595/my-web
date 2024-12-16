import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';



const Calendario = ({ selectedDate, setSelectedDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Selecciona una fecha"
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue);
          
        }}
        renderInput={(params) => <TextField {...params} 
       
        sx={{
          mt: 2,
          height:"50px",
          width: '362px',
          marginBottom:"24px",
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: 'white',
            color: 'black',
            
            '& fieldset': { borderColor: 'black' },
            '&:hover fieldset': { borderColor: 'black' },
            '&.Mui-focused fieldset': { borderColor: 'black' },
            '&.Mui-focused': { color: 'black' },
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            color: '#666666', // Color del texto
            textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
          },
          '& .MuiInputLabel-root': { 
            color: 'black',
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            color: '#666666', // Color del texto
            textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
          },
          '& .MuiInputAdornment-root': { 
            color: 'black',
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            color: '#666666', // Color del texto
            textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
          },
          
        }}
        

        />}
      />
    </LocalizationProvider>
  );
};

export default Calendario;