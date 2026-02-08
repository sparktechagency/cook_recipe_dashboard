import React, { useState } from "react";
import { Table, Button, Modal, Input, Pagination } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import ReplyUser from "./ReplyUser";
import Navigate from "../../Navigate";
import { useGetContactQuery } from "../redux/api/routeApi";
import { LiaReplySolid } from "react-icons/lia";

const Support = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: contactSupport } = useGetContactQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const [selectedShop, setSelectedShop] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  // const dataSource = [
  //   {
  //     key: "1",
  //     shopName: "Cameron Salons",
  //     address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  //     genderCategory: "Male",
  //     category: "Skin care",
  //     ownerName: "Mike Smith",
  //     email: "sadgfjdg@gmail.com",
  //     phone: "+3489 9999 9778",
  //     bankName: "AB Bank",
  //     description : 'the dfiasd eruopie dsfss',
  //     accountHolder: "Dianne Russell",
  //     accountNumber: "6575675678676",
  //     branchCode: "4575467",
  //     branchCity: "New York",
  //     date:'12/5/2024',
  //     city: "Us",
  //     image: "https://via.placeholder.com/40",
  //   },
  // ];

  const dataSource =
    contactSupport?.data?.data?.map((sub, index) => ({
      key: sub?._id,
      sl: index + 1,
      name: sub?.name,
      email: sub?.email,
      subject: sub?.subject,
      message: sub?.message,
      createdAt: new Date(sub?.createdAt).toLocaleString(),
    })) || [];

  const columns = [
    {
      title: "#",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img src={record.image} alt="Shop" className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },

    {
      title: "View Details",
      key: "viewDetails",
      render: (record) => (
        <Button
          onClick={() => {
            setSelectedShop(record);
            setOpen(true);
          }}
          shape="circle"
          icon={<EyeOutlined />}
          style={{ backgroundColor: "#016A70", color: "white" }}
        />
      ),
    },
    // {
    //   title: "Reply",
    //   key: "reply",
    //   render: (record) => (

    //       <button
    //       onClick={() => setOpenAddModal(true)}
    //                 className={
    //                   "bg-[#BBC5AA] text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md"
    //                 }
    //               >
    //                 <LiaReplySolid />
    //               </button>
    //   ),
    // },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-1 h-screen ">
      <div className="flex justify-between mb-4">
        <Navigate title={"Support"} />
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={contactSupport?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title="Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={false}
        width={500}
      >
        {selectedShop && (
          <div>
            <p>
              <strong>Name:</strong> {selectedShop.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedShop.email}
            </p>
            <p>
              <strong>Subject:</strong> {selectedShop.subject}
            </p>
            <p>
              <strong>Message:</strong> {selectedShop.message}
            </p>
          </div>
        )}
      </Modal>
      {/* <ReplyUser
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      ></ReplyUser> */}
    </div>
  );
};

export default Support;
