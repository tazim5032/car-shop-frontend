import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import {
  logOut,
  selectCurrenttoken,
} from "../../redux/features/auth/AuthSlice";
import { VerifyToken } from "../../utils/verifyToken";
import { TUserRole } from "../../types/user";

const NavigationBar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrenttoken);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const user = token ? VerifyToken(token) : null;
  const role = (user as TUserRole)?.role;

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/all-products" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-300 ${
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-600 hover:text-red-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {role && (
            <NavLink
              to={`/${role}`}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-300 ${
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-600 hover:text-red-500"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-2">
          <img
            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUD_NAME}/image/upload/v1744955617/car_logo_vrhvo3.png`}
            alt="Car Logo"
            className="w-12 h-10 object-contain"
          />
          <h1 className="text-xl font-extrabold text-red-600">
            Magestic<span className="text-gray-800">Motors</span>
          </h1>
        </div>

        <div className="hidden md:flex space-x-3 items-center">
          {!token && (
            <>
              <Button
                className="bg-red-600 hover:bg-red-500 text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
          {token && (
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={handleLogOut}
            >
              LogOut
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <MenuOutlined
            onClick={showDrawer}
            style={{ fontSize: 24, color: "#dc2626" }}
          />
        </div>
      </div>

      <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block text-base transition duration-300 ${
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-500"
                  }`
                }
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {role && (
            <li>
              <NavLink
                to={`/${role}`}
                className={({ isActive }) =>
                  `block text-base transition duration-300 ${
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-500"
                  }`
                }
                onClick={onClose}
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          {!token && (
            <>
              <Button
                className="bg-red-600 hover:bg-red-500 text-white"
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
              >
                Login
              </Button>
              <Button
                className="bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => {
                  navigate("/register");
                  onClose();
                }}
              >
                Register
              </Button>
            </>
          )}
          {token && (
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={() => {
                handleLogOut();
                onClose();
              }}
            >
              LogOut
            </Button>
          )}
        </div>
      </Drawer>
    </nav>
  );
};

export default NavigationBar;
