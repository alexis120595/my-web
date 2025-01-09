// Archivo que contiene la barra de búsqueda de sucursales
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function SearchBarSucursales({ onSearch }) {
  // Estado para almacenar el valor de la búsqueda
  const [query, setQuery] = useState('');

// Función para manejar el cambio en el campo de búsqueda
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
// Función para manejar la búsqueda
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="left" width="100%" mb={4}>
    <Box position="relative" width="286px">
      {/* Campo de búsqueda */}
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar sucursal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                {/* Icono de búsqueda */}
                <SearchIcon sx={{ width: '18px', height: '18px' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{
          width: '286px',
          height: '50px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px', 
            backgroundColor: 'white',
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
          '& .MuiInputLabel-root': {
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            color:'#666666'     
          },
        }}
      />
      <Box position="absolute" top={0} right={0} mt={2} mr={2}>
        
      </Box>
    </Box>
  </Box>
  );
}

export default SearchBarSucursales;