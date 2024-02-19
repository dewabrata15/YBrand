import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { router } from "../../router/router";
import { moneystring } from "../../helper/money";

function DetailProducts() {
  const params = useParams();
  useEffect(() => {
    fetching();
  }, []);

  const [data, setData] = useState([]);
  const fetching = async () => {
    try {
      const { data } = await axios.get(router + "publics/products/" + params);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full px-10 h-screen flex justify-center items-center">
        <div className="w-full flex h-[500px] mx-auto shadow-lg">
          <div className="w-[40%] rounded-s-md overflow-hidden">
            <img src={data.imgUrl} alt={data.name} className="w-full h-full" />
          </div>
          <div className="w-[60%] h-full p-10 flex justify-center items-center">
            <div className="">
              <h1 className="text-[40px] font-bold">{data.name}</h1>
              <p className="text-[20px] my-5  ">{data.description}</p>
              <div className="flex mb-10">
                <p className="text-[15px]">
                  Price:{" "}
                  <span className="font-bold">
                    Rp.{data.price && moneystring(data.price)}
                  </span>
                </p>
                <p className="text-[15px] ms-5">
                  Stock: <span className="font-bold">{data.stock}</span>
                </p>
              </div>
              <Link
                to={"/home"}
                className="px-10 py-2 bg-slate-800 text-white font-medium rounded-md"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailProducts;
