import MyOrders from "../pages/users/MyOrders";
import Profile from "../pages/users/Profile";
import UserOverview from "../pages/users/UserOverview";

export const userRoutes = [
  {
    index: true,
    element: <UserOverview></UserOverview>,
  },
  {
    path: "my-order",
    element: <MyOrders></MyOrders>,
  },
  {
    path: "profile",
    element: <Profile></Profile>,
  },
];
