import { moneystring } from "../../helper/money";
import { Link } from "react-router-dom";

function Cards({ data }) {
  return (
    <>
      <div className="card w-[280px] bg-base-100 m-4 rounded-md shadow-lg shadow-black">
        <figure>
          <img src={data.imgUrl} alt={data.name} className="w-full h-[200px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[15px] font-bold">{data.name}</h2>
          <div className="flex justify-between w-full mt-5">
            <p className="text-[15px]">
              Price:{" "}
              <span className="font-bold">Rp.{moneystring(data.price)}</span>
            </p>
            <p className="text-[15px]">
              Stock: <span className="font-bold">{data.stock}</span>
            </p>
          </div>
          <div className="card-actions justify-end mt-2">
            <Link
              to={"product/1"}
              className="bg-slate-950 text-white border-black px-3 py-1.5 rounded-sm"
            >
              See more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
