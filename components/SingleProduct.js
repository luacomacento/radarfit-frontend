import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { forwardRef, useContext } from 'react';
import AppContext from '../context/AppContext';
import ProductCard from './ProductCard';

const API_URL= process.env.NEXT_PUBLIC_API_URL;

const SingleProduct = forwardRef((props, ref) => {
  const { selectedProduct, setSelectedProduct, setProducts, setEditProductOpen} = useContext(AppContext);

  const handleDelete = async () => {
    const { id } = selectedProduct;
    await axios.delete(`${API_URL}/produtos/${id}`);
    const { data } = await axios.get(`${API_URL}/produtos/`);
    setProducts(data);
    setSelectedProduct();
  };

  if (!selectedProduct) return (
    <p>Selecione um produto.</p>
  );

  return (
    <ProductCard ref={ref} $isModal={props.isModal} sx={{p: 4}} elevation={4}>
      <h2>{selectedProduct?.produto}</h2>
      <h3>Valor:</h3>
      <p>{`R$ ${selectedProduct?.valor?.toFixed(2)}`}</p>
      <h3>Descrição:</h3>
      <p>{selectedProduct?.descricao}</p>
      <Stack direction="row" spacing={4} marginTop={4} justifyContent="flex-end">
        <Button variant="contained"
          onClick={() => setEditProductOpen(true)}
          startIcon={<EditIcon />}>Editar</Button>
        <Button color="error" onClick={handleDelete} startIcon={<Delete />}>Excluir</Button>
      </Stack>
    </ProductCard>
  );
});

SingleProduct.displayName = 'SingleProduct';

SingleProduct.propTypes = {
  isModal: PropTypes.bool
};

SingleProduct.defaultProps = {
  isModal: false
};

export default SingleProduct;