import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";

import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";



import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";

import Login from "../Auth/Login";
import Subscription from "../page/Subscription/Subscription";
import AdPromotional from "../page/adpromotion/AdPromotional";
import Support from "../page/contactSupport/Support";
import Transaction from "../page/transaction/Transaction";
import Recipe from "../page/Recipe/Recipe";
import AddRecipe from "../page/Recipe/AddRecipe";
import EditRecipe from "../page/Recipe/EditRecipe";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import RecipeDetailsPage from "../page/Recipe/RecipeDetailsPage";
import Category from "../page/Category/Category";
import HelpAndSupport from "../page/Settings/HelpAndSupport";
import AboutUs from "../page/Settings/AboutUs";
import Subscribe from "../page/subscribe/Subscribe";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
     
     
      {
        path: "/dashboard/recipe",
        element: <Recipe></Recipe>
      },
      {
        path: "/dashboard/recipe/recipeDetails/:id",
        element: <RecipeDetailsPage></RecipeDetailsPage>
      },
      {
        path: "/dashboard/recipe/addRecipe",
        element: <AddRecipe></AddRecipe>
      },
      {
        path: "/dashboard/recipe/editRecipe/:id",
        element: <EditRecipe></EditRecipe>
      },
      {
        path: "/dashboard/category",
        element: <Category></Category>
      },
      {
        path: "/dashboard/adPromotion",
        element: <AdPromotional></AdPromotional>
      },
    
      {
        path: "/dashboard/support",
        element: <Support></Support>,
      },
      {
        path: "/dashboard/transaction",
        element: <Transaction></Transaction>
      },
     
      {
        path: "/dashboard/Subscription",
        element: <Subscription></Subscription>,
      },

        {
        path: "/dashboard/Subscribe",
        element: <Subscribe></Subscribe>
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
   
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },

      {
        path: "/dashboard/Settings/help&Support",
        element: <HelpAndSupport></HelpAndSupport>
      },

      {
        path: "/dashboard/Settings/aboutUs",
        element: <AboutUs></AboutUs>
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
