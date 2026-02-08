/* eslint-disable react-hooks/exhaustive-deps */

import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsSubstack } from "react-icons/bs";
import { IoFastFoodOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { SlSupport } from "react-icons/sl";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LuLayoutDashboard />,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: <FaRegCircleUser />,
    link: "/dashboard/UserManagement",
  },
 
  {
    key: "recipe",
    label: "Recipe",
    icon: <IoFastFoodOutline />,
    link: "/dashboard/recipe",
  },
  {
    key: "category",
    label: "Category",
    icon: <MdOutlineCategory />,
    link: "/dashboard/category",
  },
  {
    key: "subscription",
    label: "Subscription",
    icon: <BsSubstack />,
    link: "/dashboard/Subscription",
  },
  {
    key: "adPromotional",
    label: "Ad Promotional",
    icon: <GrAnnounce />,
    link: "/dashboard/adPromotion",
  },
  {
    key: "transaction",
    label: "Transaction",
    icon: <AiOutlineDollarCircle />,
    link: "/dashboard/transaction",
  },
  {
    key: "subscribe",
    label: "Subscribe",
    icon: <SlSupport />,
    link: "/dashboard/Subscribe",
  },
  {
    key: "support",
    label: "Contact Support",
    icon: <SlSupport />,
    link: "/dashboard/support",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <IoSettingsOutline />,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },

      {
        key: "aboutUs",
        label: "About Us",
        link: "/dashboard/Settings/aboutUs",
      },

      {
        key: "helpSupport",
        label: "Help & Support",
        link: "/dashboard/Settings/help&Support",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
      
    ],
  },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-[100vh] bg-[#495F48]">
      
      <div className="custom-sidebar-logo flex justify-center">
        <img src={logo} alt="Logo" className="w-[160px]" />
      </div>
      <div className="menu-items">
        {items.map((item) => {
          const isSettingsActive =
            item.key === "settings" &&
            item.children.some((child) => child.link === location.pathname);

          const isCreatorActive =
            item.key === "creatorManagement" &&
            item.children.some((child) => child.link === location.pathname);

          const isCategoriesActive =
            item.key === "categoriesManagement" &&
            item.children.some((child) => child.link === location.pathname);

          return (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`menu-item my-4 mr-3 py-3 px-3 flex items-center cursor-pointer ${
                  selectedKey === item.key || isSettingsActive || isCreatorActive || isCategoriesActive
                    ? "bg-[#707666] rounded-tr rounded-br text-white "
                    : "bg-white  hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault(); 
                    onParentClick(item.key); 
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
              >
                {/* <img src={item.icon} alt={item.label} className="w-5 h-5 mr-3" /> */}
                <h1 className="mr-2">{item.icon}</h1>
                <span className="block w-full">{item.label}</span>

                {/* Show dropdown arrow if children exist */}
                {item.children && (
                  <FaChevronRight
                    className={`ml-auto transform transition-all duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Show children menu if expanded */}
              {item.children && (
                <div
                  className={`children-menu bg-white -my-2 mr-3 transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      className={`menu-item p-4 flex items-center cursor-pointer ${
                        selectedKey === child.key
                          ? "bg-[#707666] text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedKey(child.key); // Set the selected key for children
                        setExpandedKeys([]); // Close all expanded items
                      }}
                    >
                      <span className="block w-full ">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="  w-full pt-5 pr-3">
        <button
          onClick={handleLogout}
          className="w-full flex bg-white text-red-500 text-start   p-3"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
