import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-end w-full mb-4">
      <div className="relative">
        <TextField
          variant="outlined"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar productos..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
           className="bg-gray-200 border border-gray-400 focus:border-black"
        />
         <div className="absolute top-0 right-0 mt-2 mr-2">
          {/* Aquí puedes agregar cualquier otro contenido que desees */}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;