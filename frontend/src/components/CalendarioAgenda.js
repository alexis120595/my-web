import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const CalendarioAgenda = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Selecciona una fecha"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              mt: 2,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'white',
                color: 'black',
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
                '&.Mui-focused': { color: 'black' },
              },
              '& .MuiInputLabel-root': {  fontFamily: 'Poppins', // Aplica la fuente Poppins
                fontSize: '14px',      // Tamaño de fuente 14px
                color: '#666666',
               },
              '& .MuiInputAdornment-root': { color: 'black' },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CalendarioAgenda;