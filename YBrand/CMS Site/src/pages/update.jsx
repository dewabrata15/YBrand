import { useState } from "react";
import ReuseBtn from "../component/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { route } from "../../router/router";

function UpdateData() {
  const [img, setImg] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const uploadFile = (e) => {
    setImg(e.target.files[0]);
  };

  const axiosUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imgUrl", img);

      Swal.fire({
        icon: "success",
        title: "berhasil upload img",
        text: "Process Uploading...",
      });

      await axios.patch(route + `products/${params.id}/image-url`, formData, {
        // passing bodynya (formData)
        headers: {
          Authorization: "Bearer " + localStorage.token,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
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
        <div className="w-[40%] p-5 mx-auto bg-white shadow-lg flex flex-col justify-center items-center rounded-md border-[1px] border-black">
          <h1 className="text-[40px] font-bold">update img</h1>
          <form onSubmit={axiosUpload}>
            <div className="my-5 relative w-full h-full">
              <img
                src="https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1705107380~exp=1705107980~hmac=ecab69fa02b0c73d66213808d7355eeea6b7f23b9010b6248d9439b22174d7c3"
                alt="samples"
                className="blur-[2px]"
              />
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400%] font-bold text-white shadow-md">
                SAMPLES
              </h1>
            </div>

            <input onChange={uploadFile} type="file" />
            <ReuseBtn />
          </form>
        </div>
      </section>
    </>
  );
}

export default UpdateData;
