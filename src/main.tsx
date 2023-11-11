import ReactDOM from "react-dom/client";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Signin from "./Main/components/signin/signin";
import loginAction, { authProvider } from "./api/requests";
import { Provider } from "react-redux";
import { store } from "./redux";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    loader() {
      return { user: authProvider.username };
    },
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Header />
    <main>
      <RouterProvider router={router} />
    </main>
    <Footer />
  </Provider>
);
