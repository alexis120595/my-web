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
          width: '300px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: 'white',
            color: 'black',
            '& fieldset': { borderColor: 'black' },
            '&:hover fieldset': { borderColor: 'black' },
            '&.Mui-focused fieldset': { borderColor: 'black' },
            '&.Mui-focused': { color: 'black' },
          },
          '& .MuiInputLabel-root': { color: 'black' },
          '& .MuiInputAdornment-root': { color: 'black' },
        }}

        />}
      />
    </LocalizationProvider>
  );
};

export default Calendario;