import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { route } from "../../router/router";

function Categories() {
  const navigate = useNavigate();
  useEffect(() => {
    fetching();
  }, []);

  const [data, setData] = useState([]);
  const fetching = async () => {
    try {
      const { data } = await axios.get(route + "categories", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });

      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-full ps-[15%] h-screen">
        <div className="w-full p-5">
          <h1 className="text-[30px] font-bold">Categories</h1>
          <div className="w-fit h-20 mt-3">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((el) => {
                      return (
                        <tr
                          key={el.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {el.id}
                          </th>
                          <td className="px-6 py-4">{el.name}</td>
                        </tr>
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

export default Categories;
