import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="fixed w-[15%] h-full bg-slate-800">
        <div className="w-full py-5 px-3">
          <Link
            to="dashboard"
            className={
              pathname === "/dashboard"
                ? "w-full bg-gray-400 text-white py-2 rounded-md mb-2 flex justify-evenly items-center duration-300 ease-in-out transition-all hover:text-white hover:bg-gray-400"
                : "w-full bg-white py-2 rounded-md mb-2 flex justify-evenly items-center duration-300 ease-in-out transition-all hover:text-white hover:bg-gray-400"
            }
          >
            <h1>Dashboard</h1>
            <i className="fa-solid fa-chart-pie" />
          </Link>
          <Link
            to="categories"
            className={
              pathname === "/categories"
                ? "w-full bg-gray-400 text-white py-2 rounded-md mb-2 flex justify-evenly items-center duration-300 ease-in-out transition-all hover:text-white hover:bg-gray-400"
                : "w-full bg-white py-2 rounded-md mb-2 flex justify-evenly items-center duration-300 ease-in-out transition-all hover:text-white hover:bg-gray-400"
            }
          >
            <h1>Categories</h1>
            <i className="fa-solid fa-table-list" />
          </Link>
          <Link
            to="register"
            className={
              pathname === "/register"
                ? "w-full bg-gray-400 text-white py-2 rounded-md mb-2 flex justify-evenly items-center duration-300 ease-in-out transition-all hover:text-white hover:bg-gray-400"
                : "w-full bg-white py-2 rounded-md mb-2 flex justify-evenly items-center duration-300 ease-in-out transition-all hover:text-white hover:bg-gray-400"
            }
          >
            <h1>register</h1>
            <i className="fa-solid fa-user-tie" />
          </Link>
          <button
            onClick={logout}
            className="w-full bg-white py-2 rounded-md mb-2 flex justify-evenly items-center"
          >
            <h1>logout</h1>
            <i className="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
