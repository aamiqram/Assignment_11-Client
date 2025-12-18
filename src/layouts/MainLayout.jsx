import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="grow pt-20">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
