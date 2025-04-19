import {
  DashboardOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/features/hook";
import { logOut } from "../redux/features/auth/AuthSlice";

export const AdminSidebarItems = (role: string) => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const adminRoutesItems = [
    {
      key: "logo",
      label: (
        <NavLink to={`/`} className="text-xl font-bold text-red-600">
          Magestic<span className="">Motors</span>
        </NavLink>
      ),
    },
    {
      key: "overview",
      icon: <DashboardOutlined />,
      label: <NavLink to={`/${role}`}>Dashboard</NavLink>,
    },
    {
      key: "products",
      icon: <AppstoreAddOutlined />,
      label: "Products",
      children: [
        {
          key: "create-product",
          icon: <AppstoreAddOutlined />,
          label: <NavLink to={`all-new-product`}>Add New Car</NavLink>,
        },
        {
          key: "all-products",
          icon: <UnorderedListOutlined />,
          label: <NavLink to={`all-products`}>All Cars</NavLink>,
        },
      ],
    },

    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: <NavLink to={`manage-orders`}>Manage Orders</NavLink>,
    },
    {
      key: "users",
      icon: <UsergroupAddOutlined />,
      label: <NavLink to={`all-users`}>Users</NavLink>,
    },
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <NavLink to={`/`}>Go to Home</NavLink>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span
          className="cursor-pointer text-red-500 hover:text-red-600"
          onClick={handleLogOut}
        >
          Logout
        </span>
      ),
    },
  ];

  return adminRoutesItems;
};
