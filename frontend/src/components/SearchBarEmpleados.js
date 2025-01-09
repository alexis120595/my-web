// Archivo que contiene el diseño del campo de búsqueda de empleados
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function SearchBarEmpleados({ onSearch }) {
  // Estado para almacenar el valor del campo de búsqueda
  const [query, setQuery] = useState('');
// Función que se ejecuta cuando el usuario escribe en el campo de búsqueda
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
// Función que se ejecuta cuando el usuario presiona el botón de búsqueda
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" mb={4}>
    <Box position="relative" width="60%"  sx={{ mr:25 }} >
      {/* Campo de texto para realizar la búsqueda */}
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar profesional"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                {/* Icono de búsqueda */}
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
    
        sx={{
         
          width: '286px',  
          height: '50px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px', 
            backgroundColor: 'white', 
            fontFamily: 'Poppins',
            fontSize:'14px',
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        }}
      />
      <Box position="absolute" top={0} right={0} mt={2} mr={2}>
        
      </Box>
    </Box>
  </Box>
  );
}

export default SearchBarEmpleados;