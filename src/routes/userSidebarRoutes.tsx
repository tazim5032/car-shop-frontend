import React from "react";
import {
  HomeFilled,
  ProfileFilled,
  ShoppingOutlined,
  LineChartOutlined,
  LogoutOutlined,

} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/features/hook";
import { logOut } from "../redux/features/auth/AuthSlice";

export const UserSidebarItems = (role: string) => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const userRoutesItems = [
    {
      key: "Logo",
      label: <NavLink to={`/`} className="text-xl font-bold tracking-wide">Majestic Motors</NavLink>,
    },
    {
      key: "Dashboard",
      icon: React.createElement(LineChartOutlined),
      label: <NavLink to={`/${role}`}>Dashboard</NavLink>,
    },
    {
      key: "Orders",
      icon: React.createElement(ShoppingOutlined),
      label: <NavLink to={`/${role}/my-order`}>My Purchases</NavLink>,
    },
    {
      key: "Account",
      icon: React.createElement(ProfileFilled),
      label: <NavLink to={`/${role}/profile`}>My Account</NavLink>,
    },
    {
      key: "Home",
      icon: React.createElement(HomeFilled),
      label: <NavLink to={`/`}>Go Home</NavLink>,
    },
    {
      key: "Logout",
      icon: React.createElement(LogoutOutlined),
      label: (
        <span className="cursor-pointer transition duration-300" onClick={handleLogOut}>
          Sign Out
        </span>
      ),
    },
  ];

  return userRoutesItems;
};
