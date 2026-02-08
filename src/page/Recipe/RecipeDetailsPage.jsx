import React from "react";
import { useGetRecipeDetailsQuery } from "../redux/api/routeApi";
import { useParams } from "react-router-dom";
import Navigate from "../../Navigate";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useGetRecipeDetailsQuery({ id }, { refetchOnMountOrArgChange: true });
  console.log(recipe)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching recipe details.</div>;

  return (
    <div className=" h-screen bg-white p-1">
      <div className="flex justify-between">
        <Navigate title={"Details"}></Navigate>
      </div>
      <div className="grid grid-cols-2 gap-5 p-5">
        {/* Recipe Image */}
        <div className=" ">
          <img
            src={recipe?.data?.image}
            alt={recipe?.data?.name}
            className="w-full "
          />
        </div>

        {/* Recipe Details */}
        <div className="border-l pl-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {recipe?.data?.name}
          </h1>
          <p className="text-sm text-gray-500">{recipe?.data?.category}</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold ">Ingredients:</h2>
            <ul className="list-disc pl-5 space-y-1">
              {recipe?.data?.ingredients?.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Instructions:</h2>
            <p className="text-gray-700">{recipe?.data?.instructions}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Nutritional Information:</h2>
            <table className="min-w-full table-auto mt-">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left border-b">Nutrient</th>
                  <th className="px-4 py-2 text-left border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">
                    <strong>Calories</strong>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {recipe?.data?.nutritional?.calories}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    <strong>Protein</strong>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {recipe?.data?.nutritional?.protein}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    <strong>Carbs</strong>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {recipe?.data?.nutritional?.carbs}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    <strong>Fat</strong>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {recipe?.data?.nutritional?.fat}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <strong>Fiber</strong>
                  </td>
                  <td className="px-4 py-2">
                    {recipe?.data?.nutritional?.fiber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p className="">
              <span className="font-semibold">Prep Time:</span> {recipe?.data?.prep_time} minutes
            </p>
            <p className="">
              <span className="font-semibold">Serving Size:</span> {recipe?.data?.serving_size}g
            </p>
            <p className="">
              <span className="font-semibold">Serving Temperature:</span>{" "}
              {recipe?.data?.serving_temperature}
            </p>
            <p className="">
              <span className="font-semibold">Flavor:</span> {recipe?.data?.flavor}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">
              Additional Info:
            </h2>
            <p className="">
              <span className="font-semibold">Weight and Muscle:</span>{" "}
              {recipe?.data?.weight_and_muscle}
            </p>
            <p className="">
              <span className="font-semibold">Holiday Recipes:</span> {recipe?.data?.holiday_recipes}
            </p>
            <p className="">
              <span className="font-semibold">Kid Approved:</span>{" "}
              {recipe?.data?.kid_approved ? "Yes" : "No"}
            </p>
            <p className="">
              <span className="font-semibold">No Weekend Prep:</span>{" "}
              {recipe?.data?.no_weekend_prep ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
