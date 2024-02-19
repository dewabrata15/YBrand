import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="w-full h-12 z-20 px-10 fixed bg-white flex justify-between items-center shadow-md">
        <h1>Y Brand</h1>
        <div className="">
          <button
            onClick={() => navigate("/home")}
            className="py-3 px-10 duration-300 ease-in-out transition-all hover:bg-slate-950 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/detail")}
            className="py-3 px-10 duration-300 ease-in-out transition-all hover:bg-slate-950 hover:text-white"
          >
            Detail
          </button>
          <a href="https://y-brand-cms.web.app"
            className="py-3 px-10 duration-300 ease-in-out transition-all hover:bg-slate-950 hover:text-white"
          >
            Login
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
