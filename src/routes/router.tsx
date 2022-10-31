import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "./components/ErrorRoutes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
