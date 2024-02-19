import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

function MainPages() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/dashboard");
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
