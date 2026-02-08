import React, { useState } from "react";
import { Table, Space, message, Pagination } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteAddMutation, useGetAllAddQuery } from "../redux/api/settingApi";
import EditPromotionModal from "./EditPromotionModal";

const Adds = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: allAdd, isLoading } = useGetAllAddQuery({page: currentPage,
    limit: pageSize,});
  const [deleteAdd] = useDeleteAddMutation()
  
  const [editModal, setEditModal] = useState(false);
  const [selectedAdd, setSelectedCategory] = useState(null);
 

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tableData = allAdd?.data?.map((item, index) => ({
    key: item._id,
    serial: index + 1,
    image: item.image,
    url: item.url,
  }));

  const handleDeleteCategory = async (id) => {
  
    try {
      const res = await deleteAdd( id ).unwrap(); 
      message.success(res?.message);
    } catch (error) {
      message.error(error?.data?.message || 'Error deleting FAQ');
    }
  };

  const columns = [
    {
      title: "S no.",
      dataIndex: "serial",
      key: "serial",
      align: "left",
      render: (text) => <div className="pl-4">{text}</div>,
    },
    {
      title: <div className="text-center">Ads</div>,
      dataIndex: "ads",
      key: "ads",
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex items-center gap-3 bg-[#B4D3B3] rounded-md shadow-sm w-fit">
            <img
              src={record.image}
              alt="Ad"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="p-4">
              <h4 className="text-sm font-semibold leading-tight">Welcome</h4>
              <a href={record.url} target="_blank" rel="noopener noreferrer">
                {record.url}
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="text-right pr-4">Action</div>,
      key: "action",
      render: (record) => (
        <div className="flex justify-end pr-2">
          <Space size="middle">
            <button
              onClick={() => handleEdit(record)}
              className="bg-[#495F48] p-2 rounded text-xl text-white"
            >
              <FiEdit2 />
            </button>
            <button onClick={() => handleDeleteCategory(record?.key)} className="bg-red-500 p-2 rounded text-xl text-white">
              <RiDeleteBin6Line />
            </button>
          </Space>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="p-3">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowClassName="border-b border-gray-200"
      />

<div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={allAdd?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            
          />
        </div>

      <EditPromotionModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedAdd={selectedAdd}
      ></EditPromotionModal>
    </div>
  );
};

export default Adds;
