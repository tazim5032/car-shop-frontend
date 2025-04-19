import { Layout, Menu } from "antd";

import { Outlet } from "react-router-dom";
import { UserSidebarItems } from "../routes/userSidebarRoutes";
import { useAppSelector } from "../redux/features/hook";
import { selectCurrenttoken } from "../redux/features/auth/AuthSlice";
import { VerifyToken } from "../utils/verifyToken";
import { AdminSidebarItems } from "../routes/adminSidebarRoutesItesm";
import { TUserRole } from "../types/user";

const { Sider } = Layout;

const SideBar = () => {
  let userSidebarItems;
  let user;

  const token = useAppSelector(selectCurrenttoken);
  if (token) {
    user = VerifyToken(token);
  }
  if ((user as TUserRole)?.role === "admin") {
    userSidebarItems = AdminSidebarItems("admin");
  } else if ((user as TUserRole)?.role === "user") {
    userSidebarItems = UserSidebarItems("user");
  }

  return (
    <div>
      <Layout className="">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={userSidebarItems}
            className="mt-3"
          />
        </Sider>
        <Layout className="p-4">
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideBar;
