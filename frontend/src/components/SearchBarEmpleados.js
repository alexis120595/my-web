import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function SearchBarEmpleados({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" mb={4}>
    <Box position="relative" width="60%"  sx={{ mr:25 }} >
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar profesional"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
    
        sx={{
         
          width: '286px',  
          height: '50px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px', // Bordes redondeados
            backgroundColor: 'white', // Color de fondo
            fontFamily: 'Poppins', // Tipo de fuente
            fontSize:'14px',
            '& fieldset': {
              borderColor: 'black', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: 'black', // Color del borde al pasar el mouse
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black', // Color del borde al enfocar
            },
          },
        }}
      />
      <Box position="absolute" top={0} right={0} mt={2} mr={2}>
        {/* Aquí puedes agregar cualquier otro contenido que desees */}
      </Box>
    </Box>
  </Box>
  );
}

export default SearchBarEmpleados;