/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, message, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../redux/api/categoryApi";

export const EditCategoryModal = ({ open, setOpen, category }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        status: category.status,
      });
      if (category.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: category.image,
          },
        ]);
      }
    }
  }, [category, form]);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("status", values.status);
    
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const res = await updateCategory({
        id: category.id,
        data: formData,
      }).unwrap();
      message.success(res?.message || "Category updated successfully");
      handleCancel();
    } catch (error) {
      message.error(error?.data?.message || "Failed to update category");
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Modal
      title="Edit Category"
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" className="h-10" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select className="h-10">
            <Select.Option value="visible">Visible</Select.Option>
            <Select.Option value="hidden">Hidden</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category Image"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end">
          <Button
            onClick={handleCancel}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="bg-[#495F48] border-none hover:bg-green-800"
          >
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
