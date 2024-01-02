"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from '@mui/material/styles'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import theme from "../styles/theme";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>
          {children}
        </SCThemeProvider>
      </ThemeProvider >
    </Provider >)
}

export default Providers;