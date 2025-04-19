import AllUsers from "../pages/admin/AllUsers";
import AllProducts from "../pages/admin/AllProduct";
import CreateNewProduct from "../pages/admin/CreateNewProduct";
import AllOrders from "../pages/users/AllOrders";
import MangerOrders from "./../pages/admin/MangerOrders";

export const adminRoutes = [
  {
    index: true,
    element: <AllOrders></AllOrders>,
  },
  
  {
    path: "all-new-product",
    element: <CreateNewProduct></CreateNewProduct>,
  },
  {
    path: "all-products",
    element: <AllProducts></AllProducts>,
  },
  {
    path: "all-users",
    element: <AllUsers></AllUsers>,
  },
  {
    path: "manage-orders",
    element: <MangerOrders></MangerOrders>,
  },
];
