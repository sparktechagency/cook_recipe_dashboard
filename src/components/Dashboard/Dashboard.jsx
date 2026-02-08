import { useGetDashboardCountQuery } from "../../page/redux/api/routeApi";
import ShopRegistration from "./ShopRegistration";
import { SubscriptionGrowth } from "./SubscriptionGrowth";
import UserGrowth from "./UserGrowth";

const Dashboard = () => {
  const {data:dashboard} = useGetDashboardCountQuery()
  return (
    <div className="p-2 min-h-screen">
      <div className="  grid grid-cols-3 gap-4 text-center py-3">
        <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total User</p>
          <h1 className="text-3xl font-bold">{dashboard?.data?.totalUsers || 0}</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          
          <p className=" mt-3 text-2xl">Subscription</p>
          <h1 className="text-3xl font-bold">{dashboard?.data?.totalIncome || 0}</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          
          <p className=" mt-3 text-2xl">Total Recipe</p>
          <h1 className="text-3xl font-bold">{dashboard?.data?.totalRecipe || 0}</h1>
        </div>
       
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded p-3">
          <SubscriptionGrowth></SubscriptionGrowth>
        </div>
        <div className="bg-white rounded">
          <UserGrowth></UserGrowth>
        </div>
      </div>
      <ShopRegistration></ShopRegistration>
    </div>
  );
};

export default Dashboard;
