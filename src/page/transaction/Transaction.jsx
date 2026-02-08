import { Table, Tag, Input, Dropdown, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoIosArrowDown } from "react-icons/io";
import  Navigate  from "../../Navigate";
import { useGetTransectionQuery } from "../redux/api/routeApi";
import { useState } from "react";

const Transaction = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
 const {data:transiction} = useGetTransectionQuery({searchTerm, page: currentPage,
  limit: pageSize,})

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      key: "sl",
    },
    {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "TrasactionId",
        dataIndex: "trasactionId",
        key: "trasactionId",
      },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },

    {
      title: "Price",
      dataIndex: "fee",
      key: "fee",
    },
   
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (interval) => (
        <span className="text-[#D17C51]">{interval}</span>
      ),
    },
   
    {
      title: "Payment",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`border px-4 py-1 rounded-full text-sm ${
            status === "Paid"
              ? "border-green-500 text-green-600"
              : "border-orange-500 text-orange-500"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     sl: "#1233",
  //     name: "Kathryn Murp",
  //     avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  //     joiningDate: "12/04/24",
  //     interval: "Silver",
  //     fee: "$14.99",
  //     status: "Due",
  //   },
   
  // ];

  const data =
  transiction?.data?.result?.map((sub, index) => ({
    key: sub?._id,
    sl: index + 1,
    name: sub?.paymentDetails?.email,
    description: sub?.description,
    deration: sub?.duration,
    fee: sub?.amount,
    subscription: sub?.subscriptionId?.name,
    trasactionId: sub?.paymentDetails?.payId,
   
    status:sub?.paymentStatus,
    createdAt: new Date(sub?.createdAt).toLocaleDateString()
   
  })) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-1 h-screen">
      <div className="flex justify-between ">
        <div className="flex ">
          <Navigate title={"Transaction"} />
          
        </div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>

      <div className="p-2">
       

        <div className="rounded-md overflow-hidden">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName="border-b border-gray-300"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={transiction?.data?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
