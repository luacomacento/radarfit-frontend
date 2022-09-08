import { CssBaseline, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import ContextProvider from '../context/ContextProvider';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <StyledProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledProvider>
    </ContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object
};

export default MyApp;
