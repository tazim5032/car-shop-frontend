import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { logOut, selectCurrenttoken } from "../redux/features/auth/AuthSlice";
import { VerifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";
import { TUserRole } from "../types/user";

type TProtectedProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtextedRoute = ({ children, role }: TProtectedProps) => {
  const dispatch = useAppDispatch();
  let user;
  const token = useAppSelector(selectCurrenttoken);
  if (token) {
    user = VerifyToken(token);
  }

  if (role !== undefined && role !== (user as TUserRole)?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return <div>{children}</div>;
};

export default ProtextedRoute;
