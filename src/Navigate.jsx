import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navigate = ({title}) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 onClick={() => navigate(-1)} className="flex gap-3 cursor-pointer">
          <button className="bg-[#495F48] mt-[5px] text-sm w-5 h-5 rounded-full flex justify-center items-center text-white">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">{title}</span>
        </h1>
      </div>
    </div>
  );
};

export default Navigate;
