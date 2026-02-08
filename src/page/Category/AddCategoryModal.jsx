import { Modal, Form, Input, Upload, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateCategoryMutation } from "../redux/api/categoryApi";

export const AddCategoryModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload a category image");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", fileList[0].originFileObj);

    try {
      const res = await createCategory(formData).unwrap();
      message.success(res?.message || "Category created successfully");
      handleCancel();
    } catch (error) {
      message.error(error?.data?.message || "Failed to create category");
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Modal
      title="Add New Category"
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
          label="Category Image"
          required
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
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
