import { useState } from "react";
import axios from "axios";
import { route } from "../../router/router";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Registers() {
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
      await axios.post(route + "register", form, {
        // productions
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });

      Swal.fire({
        icon: "success",
        title: "succes register",
        text: "new staff already register",
      });

      navigate("/dashboard");
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
      <section className="w-full ps-[15%] h-screen flex justify-center items-center">
        <div className="w-[30%] p-5 mx-auto bg-white shadow-lg flex flex-col justify-center items-center rounded-md border-[1px] border-black">
          <h1 className="text-[40px] font-bold my-5">REGISTER</h1>
          <form onSubmit={submitUser} className="mb-5">
            <ul>
              <li>
                <label htmlFor="email">email</label>
              </li>
              <li>
                <input
                  type="text"
                  onChange={inputUser}
                  name="email"
                  id="email"
                  className="rounded-sm px-2 h-7 outline-none border-[1px] border-black"
                />
              </li>
            </ul>
            <ul className="my-3">
              <li>
                <label htmlFor="password">password</label>
              </li>
              <li>
                <input
                  type="password"
                  onChange={inputUser}
                  name="password"
                  id="password"
                  className="rounded-sm px-2 h-7 outline-none border-[1px] border-black"
                />
              </li>
            </ul>

            <div
              className="w-full flex
             justify-center items-center mt-7"
            >
              <button
                type="submit"
                className="w-fit px-10 py-2 bg-slate-800 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Registers;
