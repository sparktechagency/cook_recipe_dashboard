import React, { useState } from "react";
import { Table, Button, Modal, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAdminAllUserQuery } from "../../page/redux/api/userApi";
import { FaRegEye } from "react-icons/fa";

const ShopRegistration = () => {
    const [loadingId, setLoadingId] = useState(null);
      const { data: userManagement, isLoading } = useGetAdminAllUserQuery();
     
      const [selectedShop, setSelectedShop] = useState(null);
      const [open, setOpen] = useState(false);
      // Static mock data (replace this with actual data if needed)
    
      const userData =
        userManagement?.data?.result?.slice(0,3)?.map((user, index) => ({
          key: user?._id,
          sl: index + 1,
          userName: user?.name,
          email: user?.email,
          contactNumber: user?.phone_number,
          address: `${user?.shipping_address?.street_address}, ${user?.shipping_address?.city}, ${user?.shipping_address?.state}, ${user?.shipping_address?.zip_code}`,
          status: user?.status,
        })) || [];
    
        
    
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
              
            </Space>
          ),
        },
      ];
    
    return (
        <div className="p-3 bg-white mt-4">
                  <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold pb-2">Shops Registration</h2>
                <Link to={'/dashboard/UserManagement'}><button className="text-[#AB684D]">View all</button></Link>
            </div>


      <Table columns={columns} dataSource={userData} pagination={false} />

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

export default ShopRegistration;
