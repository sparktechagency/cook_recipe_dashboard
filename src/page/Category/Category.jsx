import { Table, message, Input, Pagination, Modal } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import Navigate from "../../Navigate";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../redux/api/categoryApi";
import { AddCategoryModal } from "./AddCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const pageSize = 10;

  const { data: categoryData, isLoading } = useGetCategoriesQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await deleteCategory(id).unwrap();
          message.success(res?.message || "Category deleted successfully");
        } catch (error) {
          message.error(error?.data?.message || "Failed to delete category");
        }
      },
    });
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      width: 70,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="category"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => <span className="text-gray-500">{slug}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`capitalize ${status === 'visible' ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleEdit(record)}
            className="text-[#495F48] hover:text-green-700 transition-colors"
          >
            <EditOutlined className="text-xl" />
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <DeleteOutlined className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const dataSource = categoryData?.data?.map((item, index) => ({
    key: item._id,
    id: item._id,
    sl: (currentPage - 1) * pageSize + index + 1,
    name: item.name,
    slug: item.slug,
    image: item.image,
    status: item.status,
  })) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm min-h-[87vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Navigate title="Category Management" />
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search categories..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 h-10"
          />
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#495F48] px-6 py-2 text-white rounded hover:bg-green-800 transition-colors whitespace-nowrap"
          >
            + Add Category
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={false}
          className="custom-table"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={categoryData?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      <AddCategoryModal
        open={openAddModal}
        setOpen={setOpenAddModal}
      />
      
      <EditCategoryModal
        open={editModal}
        setOpen={setEditModal}
        category={selectedCategory}
      />
    </div>
  );
};

export default Category;
