import { AddCircle } from "@mui/icons-material";
import {
  Button, CircularProgress,
  Container,
  Divider, Grid, Modal, Stack
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductsListContainer from "../components/ProductsContainer";
import SearchBar from "../components/SearchBar";
import SingleProduct from "../components/SingleProduct";
import AppContext from "../context/AppContext";

const API_URL= process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const {
    isDesktop,
    loading,
    setLoading,
    products,
    setProducts,
    addProductModalOpen,
    setAddProductOpen,
    singleProductModalOpen,
    setSingleProductOpen,
    editProductModalOpen,
    setEditProductOpen,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/produtos`);
      setProducts(data);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  if (loading)
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <Container maxWidth="lg">
      <SearchBar />

      <Stack direction="row" justifyContent="space-between">
        <h2>Produtos</h2>
        <Button
          onClick={() => setAddProductOpen(true)}
          startIcon={<AddCircle />}
        >
          Novo produto
        </Button>
      </Stack>
      <Divider />

      <Modal
        open={addProductModalOpen}
        onClose={() => setAddProductOpen(false)}
      >
        <ProductForm />
      </Modal>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={5}>
          <h3>Lista de Produtos</h3>
          <ProductsListContainer products={products} />
        </Grid>
        {isDesktop && (
          <Grid item xs={12} sm={7}>
            <h3>Detalhes</h3>
            <SingleProduct />
          </Grid>
        )}
      </Grid>

      <Modal
        open={singleProductModalOpen}
        onClose={() => setSingleProductOpen(false)}
      >
        <SingleProduct isModal />
      </Modal>

      <Modal
        open={editProductModalOpen}
        onClose={() => setEditProductOpen(false)}
      >
        <ProductForm editMode />
      </Modal>
    </Container>
  );
}
