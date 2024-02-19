import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { route } from "../../router/router";
import ColTables from "../component/col";

function Dashboards() {
  const navigate = useNavigate();
  useEffect(() => {
    fetching();
  }, []);

  const [data, setData] = useState([]);
  const fetching = async () => {
    try {
      const { data } = await axios.get(route + "products", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteId = async (id) => {
    try {
      console.log(id);
      await axios.delete(route + "products/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      fetching();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full ps-[15%] h-screen">
        <div className="w-full p-5">
          <h1 className="text-[30px] font-bold">Dashboards</h1>
          <button
            onClick={() => navigate("/dashboard/create")}
            className="px-10 py-2 mt-5 bg-slate-800 text-white rounded-md"
          >
            Create
          </button>

          <div className="w-full h-20 mt-3">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      stock
                    </th>
                    <th scope="col" className="px-6 py-3">
                      imgUrl
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((el) => {
                      return (
                        <ColTables key={el.id} data={el} deleteId={deleteId} />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboards;
