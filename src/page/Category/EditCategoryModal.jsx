/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, message, Button } from "antd";
import { useEffect } from "react";
import { useUpdateCategoryMutation } from "../redux/api/categoryApi";

export const EditCategoryModal = ({ open, setOpen, category }) => {
  const [form] = Form.useForm();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        status: category.status,
      });
    }
  }, [category, form]);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const res = await updateCategory({
        id: category.id,
        data: values,
      }).unwrap();
      message.success(res?.message || "Category updated successfully");
      handleCancel();
    } catch (error) {
      message.error(error?.data?.message || "Failed to update category");
    }
  };

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
