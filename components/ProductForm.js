import { Button, Container, FormControl, Grid, Paper, Stack, TextField } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { forwardRef, useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const API_URL= process.env.NEXT_PUBLIC_API_URL;

const style = {
  borderRadius: '8px',
  marginTop: '32px',
  p: 4,
};

const AddProduct = forwardRef((props, ref) => {
  const { products, selectedProduct, setSelectedProduct, setProducts, setAddProductOpen, setEditProductOpen} = useContext(AppContext);
  const [name, setName] = useState(
    props.editMode ? selectedProduct.produto : '');
  const [price, setPrice] = useState(
    props.editMode ? selectedProduct.valor : '');
  const [description, setDescription] = useState(
    props.editMode ? selectedProduct.descricao : ''
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.editMode) {
      const updatedProduct = {
        produto: name,
        valor: price,
        descricao: description
      };
      await axios.put(`${API_URL}/produtos/${selectedProduct.id}`, {...updatedProduct});

      const updatedList = products.map((item) => {
        if (item.id === selectedProduct.id) {
          return {...selectedProduct, ...updatedProduct};
        }
        return item;
      });
      setSelectedProduct({...selectedProduct, ...updatedProduct});
      setProducts(updatedList);
    } else {
      const {data} = await axios.post(`${API_URL}/produtos/`, {
        produto: name,
        valor: price,
        descricao: description
      });
      setProducts([...products, data]);
    }
    
    setName('');
    setPrice('');
    setDescription('');
    setAddProductOpen(false);
    setEditProductOpen(false);
  };

  return (
    <Container ref={ref}>
      <Paper sx={style}>
        <h2>{props.editMode ? 'Editar Produto' : 'Novo Produto'}</h2>
        <FormControl fullWidth>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label="Nome do produto"
                value={name} 
                margin="normal"
                onChange={({target}) => setName(target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                type="number"
                label="Valor (R$)"
                value={price} 
                inputProps={{ min: 0 }}
                margin="normal"
                onChange={({target}) => setPrice(parseFloat(target.value))}
              />
            </Grid>
          </Grid>
          <TextField
            multiline
            rows={8}
            label="Descrição"
            value={description}
            margin="normal"
            onChange={({target}) => setDescription(target.value)}
          />
          <div>
            <Stack direction="row" spacing={4} sx={{marginTop: '16px'}} justifyContent="flex-end">

              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
          
              >
                {props.editMode ? 'Editar' : 'Adicionar'}
              </Button>
              <Button
                onClick={() => {
                  setAddProductOpen(false);
                  setEditProductOpen(false);
                }}
              >
                Fechar
              </Button>
            </Stack>
          </div>
        </FormControl>
      </Paper>
    </Container>
  );
});

AddProduct.displayName = 'AddProduct';

AddProduct.propTypes = {
  editMode: PropTypes.bool
};

AddProduct.defaultProps = {
  editMode: false
};

export default AddProduct;