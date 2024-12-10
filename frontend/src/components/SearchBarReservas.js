import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function SearchBarReservas({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="flex-start" mb={4}>
    <Box position="relative" >
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar cliente, servicio, etc, "
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon sx={{ fontSize: 18,
                  color: '#313131',
                 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{
          height: '50px', // Altura del campo de texto
          width: '286px',  
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
          '& .MuiInputBase-input::placeholder': {
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px',      // Tamaño de fuente 14px
            color: '#666666',      // Color del label
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

export default SearchBarReservas;