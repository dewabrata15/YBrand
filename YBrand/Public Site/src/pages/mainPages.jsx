import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

function MainPages() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/home");
    }
  }, [pathname, navigate]);
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default MainPages;
