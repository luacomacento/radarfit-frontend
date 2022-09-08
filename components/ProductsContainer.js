import { Divider, Stack } from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import ProductCard from './ProductCard';

function ProductsListContainer() {
  const { products, selectedProduct, setSelectedProduct, setSingleProductOpen, isDesktop } = useContext(AppContext);

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    if (!isDesktop) setSingleProductOpen(true);
  };

  return (
    <Stack spacing={2} divider={<Divider />}>
      {products.map((item) => (
        <ProductCard key={item.id}
          elevation={0}
          sx={{p: 2}}
          onClick={() => handleSelectProduct(item)}
          selected={selectedProduct?.id === item.id && isDesktop}
          $isList
        >
          <h3>{item.produto}</h3>
          <p>{`R$ ${item.valor.toFixed(2)}`}</p>
        </ProductCard>
      ))}
    </Stack>
  );
}

export default ProductsListContainer;