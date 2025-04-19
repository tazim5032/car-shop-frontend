import { Outlet } from "react-router-dom";

import Footer from "../../components/footer/Footer";
import NavigationBar from "../../components/navbar/NavigationBar";

const HomePage = () => {
  return (
    <div>
      
      <div>
        <NavigationBar></NavigationBar>
      </div>
      <div className="max-w-[1600px] mx-auto mt-10 min-h-screen">
        <div className="ml-3 mr-3">
          <Outlet></Outlet>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default HomePage;
