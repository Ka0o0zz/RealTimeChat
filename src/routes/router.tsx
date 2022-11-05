import store from "@redux/store";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "../theme";
import { SnackbarUtilsConfigurator } from "@helpers/snackbar.helper";

// Routes
const Login = lazy(() => import("@pages/Auth/Login"));
const Register = lazy(() => import("@pages/Auth/Register"));
const Verify = lazy(() => import("@pages/Auth/Verify"));
const NoFoundComponent = lazy(() => import("./components/ErrorRoutes"));

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
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/verify/:uuid" element={<Verify />} />
                    <Route path="*" element={<NoFoundComponent />} />
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
