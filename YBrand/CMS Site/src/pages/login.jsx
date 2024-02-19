import { useState } from "react";
import axios from "axios";
import { route } from "../../router/router";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPages() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputUser = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(route + "login", form);
      localStorage.token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <section className="w-full h-screen flex">
        <div className="hidden md:w-[35%] md:h-full md:flex md:items-center md:justify-center lg:w-[20%]">
          <div className="">
            <h1 className="text-center text-[30px] font-bold mb-5">Login</h1>
            <form onSubmit={submitUser}>
              {/* email */}
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                </li>
                <li>
                  <input
                    className="w-full h-7 rounded-md px-1"
                    type="text"
                    onChange={inputUser}
                    name="email"
                    id="email"
                  />
                </li>
              </ul>

              {/* password */}
              <ul>
                <li>
                  <label htmlFor="password">password</label>
                </li>
                <li>
                  <input
                    className="w-full h-7 rounded-md px-1"
                    type="password"
                    onChange={inputUser}
                    name="password"
                    id="password"
                  />
                </li>
              </ul>
              <div className="w-full flex justify-center items-center">
                <button
                  className="mt-5 rounded-md px-10 py-2 bg-black text-white text-center"
                  type="submit"
                >
                  login
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full h-full relative md:w-[65%] md:block lg:w-[80%]">
          <img
            src="https://img.freepik.com/free-photo/modern-office-building-low-angle-view-skyscrapers-city-singapore-modern-office-building-low-angle-view-skyscrapers-city-singapore_231208-1463.jpg?w=740&t=st=1704889159~exp=1704889759~hmac=780f8cf892140397e54abe707c1cef59dc3e7cce1cc9233a016fa27de9de0944"
            alt="img"
            className="w-full h-full"
          />
          <div className="w-[90%] absolute py-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm flex flex-col justify-center items-center md:hidden">
            <h1 className="text-[30px] font-bold mb-5">Login</h1>
            <form onSubmit={submitUser}>
              {/* email */}
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                </li>
                <li>
                  <input
                    className="w-full h-7 rounded-md px-1"
                    type="text"
                    onChange={inputUser}
                    name="email"
                    id="email"
                  />
                </li>
              </ul>

              {/* password */}
              <ul>
                <li>
                  <label htmlFor="password">password</label>
                </li>
                <li>
                  <input
                    className="w-full h-7 rounded-md px-1"
                    type="password"
                    onChange={inputUser}
                    name="password"
                    id="password"
                  />
                </li>
              </ul>
              <div className="w-full flex justify-center items-center">
                <button
                  className="mt-5 rounded-md px-10 py-2 bg-black text-white text-center"
                  type="submit"
                >
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPages;
