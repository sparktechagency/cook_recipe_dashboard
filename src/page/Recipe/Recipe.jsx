import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { FiEdit2, FiTrash } from "react-icons/fi";
import img1 from "../../assets/header/img1.jpg";
import img2 from "../../assets/header/img2.png";
import Navigate from "../../Navigate";
import { Link } from "react-router-dom";
import {
  useDeleteRecipeMutation,
  useGetRecipeQuery,
} from "../redux/api/routeApi";
import { Input, message, Pagination } from "antd";

import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
const Recipe = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: recipe } = useGetRecipeQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const [deleteRecipe] = useDeleteRecipeMutation();
  console.log(recipe?.data?.meta?.total);

  const handleDeleteCategory = async (id) => {
    console.log(id);

    try {
      const res = await deleteRecipe(id).unwrap();
      message.success(res?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const recipeData = [
    {
      image: img1,
      mealType: "Breakfast",
      title: "Tropical Protein",
      time: "40 min",
      borderColor: "border-l-green-700",
    },
    {
      image: img2,
      mealType: "Lunch & Dinner",
      title: "Basil -Lee pasta",
      time: "40 min",
      borderColor: "border-l-gray-400",
    },
    {
      image: img1,
      mealType: "Lunch & Dinner",
      title: "Stir fried Noodles with veggies",
      time: "40 min",
      borderColor: "border-l-orange-300",
    },
    {
      image: img2,
      mealType: "Lunch",
      title: "Chicken Caesar Salad with Grilled Romaine",
      time: "40 min",
      borderColor: "border-l-orange-300",
    },
    {
      image: img1,
      mealType: "Breakfast",
      title: "Tropical Protein",
      time: "40 min",
      borderColor: "border-l-green-700",
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto ">
      <div className="flex justify-between">
        <Navigate title={"Recipe"}></Navigate>
       <div className="flex gap-4">
        <div>
           <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "500px", height: "40px" }}
        />
        </div>
        <div className="">
          <Link to={"/dashboard/recipe/addRecipe"}>
            <button
              className="bg-[#495F48] px-5 py-2 text-white rounded"
              // onClick={() => setOpenAddModal(true)}
            >
              + Add Recipe
            </button>
          </Link>
        </div>
       </div>
      </div>

      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipe?.data?.result?.map((item, index) => (
          <div
            key={index}
            className={`flex w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${item.borderColor}`}
          >
            <Link to={`/dashboard/recipe/recipeDetails/${item?._id}`}>
              <img
                src={item?.image}
                alt={item.name}
                className="w-[150px] h-[130px] object-cover"
              />
            </Link>
            <div className="flex flex-col justify-between p-4 w-2/3">
              <div>
                <p className="text-sm text-gray-500">{item.category}</p>
                <Link to={`/dashboard/recipe/recipeDetails/${item?._id}`}>
                  <h2 className="font-semibold">{item.name}</h2>
                </Link>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaClock /> {item.prep_time}
                </div>
                <div className="flex gap-2 text-gray-600">
                  <Link to={`/dashboard/recipe/editRecipe/${item?._id}`}>
                    <FiEdit2 className="cursor-pointer hover:text-blue-500" />
                  </Link>
                  <FiTrash
                    onClick={() => handleDeleteCategory(item?._id)}
                    className="cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={recipe?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Recipe;
