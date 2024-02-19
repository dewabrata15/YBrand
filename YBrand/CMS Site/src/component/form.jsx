import ReuseBtn from "./button";
import { useEffect, useState } from "react";
import axios from "axios";
import { route } from "../../router/router";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function FormFormat() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });
  useEffect(() => {
    if (params.id) {
      fetching();
    }
  }, [params.id]);

  const fetching = async () => {
    try {
      const { data } = await axios.get(route + "products/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });

      setForm(() => {
        return {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          imgUrl: data.imgUrl,
          categoryId: data.categoryId,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      if (params.id) {
        console.log(params.id);
        await axios.put(route + "products/" + params.id, form, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        Swal.fire({
          icon: "success",
          title: "succes edit",
          text: "succes edit new articles",
        });
      } else {
        await axios.post(route + "products", form, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        Swal.fire({
          icon: "success",
          title: "succes create",
          text: "succes create new articles",
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error.form);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  const ctgy = [
    {
      name: "Dress",
    },
    {
      name: "T-Shirt",
    },
    {
      name: "Polo",
    },
    {
      name: "Shirt",
    },
    {
      name: "Pants",
    },
  ];

  return (
    <>
      <div className="w-[45%] p-5 mx-auto bg-white shadow-lg flex flex-col justify-center items-center rounded-md border-[1px] border-black">
        <h1 className="text-[40px] font-bold my-5">
          {params.id ? "Edit" : "Create"}
        </h1>
        <form onSubmit={submitUser} className="mb-5 w-full">
          {/* name */}
          <ul>
            <li>
              <label htmlFor="name">name</label>
            </li>
            <li>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={inputUser}
                className="rounded-sm px-2 h-7 outline-none border-[1px] border-black w-full"
              />
            </li>
          </ul>
          {/* description */}
          <ul className="mt-5">
            <li>
              <label htmlFor="description">description</label>
            </li>
            <li>
              <textarea
                name="description"
                value={form.description}
                id="description"
                cols="30"
                rows="3"
                className="w-full px-2"
                onChange={inputUser}
              ></textarea>
            </li>
          </ul>
          {/* price - stock*/}
          <div className="flex my-3 w-full justify-between">
            {/* price */}
            <div className="flex flex-col">
              <label className="me-3" htmlFor="price">
                price:
              </label>
              <input
                type="number"
                value={form.price}
                id="price"
                name="price"
                onChange={inputUser}
                className="rounded-sm px-2 h-7 outline-none border-[1px] border-black"
              />
            </div>
            {/* stock */}
            <div className="flex flex-col">
              <label className="me-3" htmlFor="stock">
                stock:
              </label>
              <input
                type="number"
                id="stock"
                value={form.stock}
                name="stock"
                onChange={inputUser}
                className="rounded-sm px-2 h-7 outline-none border-[1px] border-black"
              />
            </div>
          </div>
          {/* imgUrl - categoryId*/}
          <div className="flex my-3 w-full justify-between">
            {/* imgUrl */}
            <div className="flex flex-col">
              <label className="me-3" htmlFor="imgUrl">
                imgUrl:
              </label>
              <input
                type="text"
                id="imgUrl"
                value={form.imgUrl}
                name="imgUrl"
                onChange={inputUser}
                className="rounded-sm px-2 h-7 outline-none border-[1px] border-black"
              />
            </div>
            {/* categoryId */}
            <div className="flex flex-col">
              <label className="me-3" htmlFor="categoryId">
                categoryId:
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={inputUser}
                className="rounded-sm w-[200px] px-2 h-7 outline-none border-[1px] border-black"
              >
                <option value="">Selecet</option>
                {ctgy &&
                  ctgy.map((el, idx) => {
                    return (
                      <option key={idx + 1} value={idx + 1}>
                        {el.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <ReuseBtn />
        </form>
      </div>
    </>
  );
}

export default FormFormat;
