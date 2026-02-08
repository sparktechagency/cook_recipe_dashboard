import { Table, Switch, Tag, Input, Button, Dropdown, Space, message } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { TbFilter } from "react-icons/tb";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddSubscriptionModal } from "./AddSubscriptionModal";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import Navigate from "../../Navigate";
import { useDeleteSubMutation, useGetSubscriptionQuery } from "../redux/api/routeApi";
import { Description } from "@headlessui/react";

const Subscription = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const {data:subscription} = useGetSubscriptionQuery();

  const handleEdit = (record) => {
    setSelectedSubCategory(record);
    setEditModal(true);
  };
  const [deleteSub] = useDeleteSubMutation()
 const handleDeleteCategory = async (id) => {
  
    try {
      const res = await deleteSub( id ).unwrap(); 
      message.success(res?.message);
    } catch (error) {
      message.error(error?.data?.message || 'Error deleting FAQ');
    }
  };


  const columns = [
    {
      title: "Sl",
      dataIndex: "sl",
      key: "sl",
    },

    {
      title: "Subscription Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Deration",
      dataIndex: "deration",
      key: "deration",
    },
    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
           onClick={() => handleEdit(record)}
            shape="circle"
            className="  rounded text-[#495F48]"
          >
            Edit
          </button>
          <button
           onClick={() => handleDeleteCategory(record?.key)}
            shape="circle"
            className="  rounded text-red-500"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // const data = [
  //   {
  //     id: "01",
  //     name: "Barber Time",
  //     description: "View ",
  //     deration: "Monthly",
  //     fee: "$09.00 ",
  //   },
  //   {
  //     id: "02",
  //     name: "Barber Time",
  //     description: "View ",
  //     deration: "Monthly",
  //     fee: "$09.00 ",
  //   },
  //   {
  //     id: "03",
  //     name: "Barber Time",
  //     description: "View ",
  //     deration: "Monthly",
  //     fee: "$09.00 ",
  //   },
  //   {
  //     id: "04",
  //     name: "Barber Time",
  //     description: "View ",
  //     deration: "Monthly",
  //     fee: "$09.00 ",
  //   },
  // ];

  const data =
    subscription?.data?.map((sub, index) => ({
      key: sub?._id,
      sl: index + 1,
      name: sub?.name,
      description: sub?.description,
      deration: sub?.duration,
      fee: sub?.fee,
     
    })) || [];

  return (
    <div>
      <div className="p-1 h-screen">
        <div className="flex justify-between">
          <div className="flex ">
            <Navigate title={"Subscription Plan"}></Navigate>
           
          </div>
          <button
            className="bg-[#495F48] px-5 py-2 text-white rounded"
            onClick={() => setOpenAddModal(true)}
          >
            + Subscription
          </button>
        </div>
        {/* Filter and Search */}
        <div className="  mt-5">
         

          {/* Table */}
          <div className=" rounded-md overflow-hidden ">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              rowClassName=" border-b border-gray-300"
            />
          </div>
        </div>
      </div>
      <AddSubscriptionModal
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      ></AddSubscriptionModal>
      <EditSubscriptionModal
     selectedSubCategory={selectedSubCategory}
        editModal={editModal}
        setEditModal={setEditModal}
      ></EditSubscriptionModal>
    </div>
  );
};

export default Subscription;
