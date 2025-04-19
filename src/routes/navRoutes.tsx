import { createBrowserRouter } from "react-router-dom";
import HomeContent from "../pages/home/HomeContent";
import About from "../pages/about/About";
import AllProducts from "../pages/allProducts/AllProductLists";
import Login from "../pages/login/Login";
import HomePage from "../pages/home/HomePage";
import SideBar from "../layouts/SideBar";
import Register from "../pages/register/Register";
import { adminRoutes } from "./admin.routes";
import { userRoutes } from "./user.routes";
import ProtextedRoute from "../layouts/ProtextedRoute";
import CheckOut from "../pages/allProducts/CheckOut";
import Failed from "../pages/allProducts/Failed";
import ProductDetails from "../pages/allProducts/ProductDetails";
import Success from "../pages/allProducts/Success";
import Cancel from "../pages/allProducts/Cancel";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        index: true,
        element: <HomeContent></HomeContent>,
      },
      {
        path: "all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>
      }
    ],
  },
  {
    path: "/admin",
    element: <ProtextedRoute role="admin"><SideBar></SideBar></ProtextedRoute>,
    children: adminRoutes,
  },
  {
    path: "/user",
    element: <ProtextedRoute role="user"><SideBar></SideBar></ProtextedRoute>,
    children: userRoutes,
  },
  {
    path:"/user/checkout",
    element: <ProtextedRoute role="user"><CheckOut></CheckOut></ProtextedRoute>
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path:"/success",
    element: <ProtextedRoute role="user"><Success></Success></ProtextedRoute>
  },
  
  {
    path:"/cancel",
    element: <ProtextedRoute role="user"><Cancel></Cancel></ProtextedRoute>
  },
  {
    path:"/fail",
    element: <ProtextedRoute role="user"><Failed></Failed></ProtextedRoute>
  },
]);
