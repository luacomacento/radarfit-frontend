import { useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [addProductModalOpen, setAddProductOpen] = useState(false);
  const [singleProductModalOpen, setSingleProductOpen] = useState(false);
  const [editProductModalOpen, setEditProductOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const contextValue = {
    isDesktop,
    products,
    setProducts,
    selectedProduct,
    setSelectedProduct,
    addProductModalOpen,
    setAddProductOpen,
    singleProductModalOpen,
    setSingleProductOpen,
    editProductModalOpen,
    setEditProductOpen
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContextProvider;