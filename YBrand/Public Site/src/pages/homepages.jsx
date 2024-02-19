import { useEffect, useState } from "react";
import Cards from "../component/cards";
import axios from "axios";
import { router } from "../../router/router";

function HomePages() {
  useEffect(() => {
    fetching();
  }, []);

  const [data, setData] = useState([]);
  const fetching = async () => {
    try {
      const { data } = await axios.get(router + "publics/products");
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-full h-fit pt-12">
        <div className="w-full h-screen flex">
          <div className="bg-slate-950 w-1/2 h-full flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="text-[70px] font-bold text-white mb-5">Y Brand</h1>
              <p className="text-pink-500">
                "Explore Your Style with More than Fashion, This is
                Self-Expression"
              </p>
              <p className="text-gray-600">
                Discover Trendy Clothing Collections and Express Your Unique
                Style with Y Brand
              </p>
              <div className="w-full h-[1px] bg-cyan-500"></div>
            </div>
          </div>
          <div className="homeImg w-1/2 h-full"></div>
        </div>

        <div className="w-full h-fit p-10 flex flex-col items-center justify-center">
          <h1 className="text-[40px] font-bold my-10 underline">
            Our Collections
          </h1>
          {/* controllers */}
          <div className="w-[87%] h-10 flex justify-between mb-10">
            <div className="w-[300px] h-full flex items-center">
              {/* filter */}
              <select
                name="filter"
                id="filter"
                className="w-[120px] h-full px-2 me-3 outline-none bg-slate-950 text-white rounded-sm"
              >
                <option value="">select</option>
              </select>

              {/* sorting */}
              <button className="py-2 px-6 me-3 bg-slate-950 text-white rounded-sm">
                ASC
              </button>
              <button className="py-2 px-5 bg-slate-950 text-white rounded-sm">
                DESC
              </button>
            </div>
            {/* search */}
            <div className="h-full flex items-center">
              <input
                type="text"
                name="search"
                id="search"
                className="w-[400px] h-full border-2 border-slate-950 px-3 outline-none rounded-s-md"
              />
              <i className="fas fa-search bg-slate-950 text-white px-5 py-3" />
            </div>
          </div>

          {/* list product */}
          <div className="w-full h-fit flex justify-center flex-wrap">
            {data &&
              data.map((el) => {
                return <Cards key={el.id} data={el} />;
              })}
          </div>

          {/* pagination */}
          <div className="w-[300px] h-10 flex mt-10 items-center justify-between">
            <button className="px-7 py-2 bg-slate-950 text-white">prev</button>
            <h1 className="font-bold">1</h1>
            <button className="px-7 py-2 bg-slate-950 text-white">next</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePages;
