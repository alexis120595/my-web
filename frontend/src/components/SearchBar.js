// Archivo que contiene el componente de la barra de búsqueda de servicios
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function SearchBar({ onSearch }) {
  // estado para almacenar la consulta de búsqueda
  const [query, setQuery] = useState('');

  // función para manejar el cambio en el campo de búsqueda
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
// función para manejar la búsqueda
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="flex-start" width="100%" mb={4}>
    <Box position="relative" width="60%">
      {/* Campo de texto para la búsqueda */}
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar servicios..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}
              sx={{width:'18px',
                height:'18px',
                color:'#313131',
              }}>
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
            fontSize: '14px',
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
        {/* Aquí puedes agregar cualquier otro contenido que desees */}
      </Box>
    </Box>
  </Box>
  );
}

export default SearchBar;