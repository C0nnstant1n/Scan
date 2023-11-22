import ReactDOM from "react-dom/client";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Signin from "./Main/components/signin/signin";
import loginAction from "./api/account_requests";
import { Provider } from "react-redux";
import { store } from "./redux";
import Search from "./Main/components/search/Search";
import searchAction from "./Main/components/search/components/searchAction";
import { protectedLoader } from "./Main/components/search/Search";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "search",
    element: <Search />,
    errorElement: <ErrorPage />,
    action: searchAction,
    loader: protectedLoader,
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
