import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../context/AppContext';

const API_URL= process.env.NEXT_PUBLIC_API_URL;


function SearchBar() {
  const initialRender = useRef(true);
  const [query, setQuery] = useState('');

  const { setProducts } = useContext(AppContext);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const fetchFind = async () => {
      const {data} = await axios.get(`${API_URL}/produtos/find/?q=${query}`);
      setProducts(data);
    };
    fetchFind();
  }, [query]);

  const handleQuery = async ({ target }) => {
    setQuery(target.value.toLowerCase());
  };

  return (
    <TextField
      placeholder="Buscar por um produto"
      id="margin-none"
      fullWidth
      margin="normal"
      value={query}
      onChange={handleQuery}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;