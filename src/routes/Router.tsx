import { createBrowserRouter } from "react-router-dom";
import {
  CreateProduct,
  Login,
  Pay,
  Product,
  Profile,
} from "../components/index.ts";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/pay",
    element: <Pay />,
  },
  {
    path: "/create/product",
    element: <CreateProduct />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
export { router };
