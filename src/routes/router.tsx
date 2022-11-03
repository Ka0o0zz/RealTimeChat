import store from "@redux/store";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "../theme";
import { SnackbarUtilsConfigurator } from "@helpers/snackbar.helper";
import { ErrorPage } from "./components/ErrorRoutes";

// Routes
const Login = lazy(() => import("@pages/Auth/Login"));

const Router = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <main>
          <SnackbarProvider>
            <SnackbarUtilsConfigurator />
            <Suspense fallback={<div>Loading ...</div>}>
              <Provider store={store}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </BrowserRouter>
              </Provider>
            </Suspense>
          </SnackbarProvider>
        </main>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default Router;
