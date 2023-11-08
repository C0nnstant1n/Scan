import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Signin from "./signin/signin";
import { postForm } from "./api/request";
import Search from "./test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "test",
    element: <Search />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
