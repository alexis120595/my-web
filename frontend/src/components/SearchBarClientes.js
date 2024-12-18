import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function SearchBarClientes({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="left" width="100%" mb={4}>
    <Box position="relative" width="286px">
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar cliente"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
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
            borderRadius: '25px', // Bordes redondeados
            backgroundColor: 'white', // Color de fondo
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
          '& .MuiInputLabel-root': {
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', 
            color:'#666666'     // Tamaño de fuente 14px
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

export default SearchBarClientes;