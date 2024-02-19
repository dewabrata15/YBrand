import { useNavigate } from "react-router-dom";
import { moneystring } from "../../helper/money";

function ColTables({ data, deleteId }) {
  const navigate = useNavigate();
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data.name}
        </th>
        <td className="px-6 py-4"> {data.description}</td>
        <td className="px-6 py-4">
          Rp.{data.price && moneystring(data.price)}
        </td>
        <td className="px-6 py-4">{data.stock}</td>
        <td className="px-6 py-4">
          <img src={data.imgUrl} alt={data.name} className="w-full h-full" />
        </td>

        <td className="px-6 py-4 flex flex-col items-start justify-center">
          <button
            onClick={() => deleteId(data.id)}
            className="px-5 py-2 bg-red-500 text-white rounded-md font-bold"
          >
            DELETE
          </button>
          <button
            onClick={() => navigate("/dashboard/edit/" + data.id)}
            className="px-5 py-2 bg-blue-500 text-white rounded-md font-bold my-2"
          >
            Edit
          </button>
          <button
            onClick={() => navigate("/dashboard/update/" + data.id)}
            className="px-5 py-2 bg-yellow-400 text-white rounded-md font-bold"
          >
            Upload IMG
          </button>
        </td>
      </tr>
    </>
  );
}

export default ColTables;
