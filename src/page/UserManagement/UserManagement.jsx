import { Table, Input, Space, Spin, message, Modal, Pagination } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped } from "react-icons/md";
import { useState } from "react";
import { LiaReplySolid } from "react-icons/lia";
import Navigate from "../../Navigate";
import { FaRegEye } from "react-icons/fa";
import {
  useBlockUserMutation,
  useGetAdminAllUserQuery,
} from "../redux/api/userApi";

const UserManagement = () => {
  const [loadingId, setLoadingId] = useState(null);
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: userManagement, isLoading } = useGetAdminAllUserQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const [blockUser] = useBlockUserMutation();
  const [selectedShop, setSelectedShop] = useState(null);
  const [open, setOpen] = useState(false);
  // Static mock data (replace this with actual data if needed)

  const userData =
    userManagement?.data?.result?.map((user, index) => ({
      key: user?._id,
      sl: index + 1,
      userName: user?.name,
      email: user?.email,
      contactNumber: user?.phone_number,
      isBlock: user?.authId?.is_block,
      address: `${user?.shipping_address?.street_address}, ${user?.shipping_address?.city}, ${user?.shipping_address?.state}, ${user?.shipping_address?.zip_code}`,
      status: user?.status,
    })) || [];

  const handleBlockUnblock = async (record) => {
    console.log(record);
    const data = {
      email: record.email,
      role: "USER",
      is_block: !record.isBlock,
    };

    console.log(data);
    try {
      const res = await blockUser(data).unwrap();
      message.success(res?.message);
    } catch (error) {
      message.error(error?.data?.message || "Error deleting FAQ");
    }
  };

  const columns = [
    { title: "SL no.", dataIndex: "sl", width: 70, align: "center" },
    { title: "User's Name", dataIndex: "userName", width: 150 },
    { title: "Email", dataIndex: "email" },

    { title: "Address", dataIndex: "address" },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              setSelectedShop(record);
              setOpen(true);
            }}
            className={
              "bg-[#495F48] text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md"
            }
          >
            <FaRegEye />
          </button>

          <button
            onClick={() => handleBlockUnblock(record)}
            className={`${
              record.isBlock === true ? "bg-red-600" : "bg-[#495F48]"
            } text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md`}
            disabled={loadingId === record.key}
          >
            {loadingId === record.key ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <MdBlockFlipped />
            )}
          </button>
        </Space>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto ">
      <div className="flex justify-between">
        <Navigate title={"User Managements"} />
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "16px", maxWidth: "300px", height: "40px" }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table "
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={userManagement?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title="Shop Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={500}
      >
        {selectedShop && (
          <div>
            <p>
              <strong>Name:</strong> {selectedShop.userName}
            </p>
            <p>
              <strong>Shop Address:</strong> {selectedShop.address}
            </p>

            <p>
              <strong>Email:</strong> {selectedShop.email}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
