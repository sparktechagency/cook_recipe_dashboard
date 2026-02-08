import { Form, Input, message, Modal, Select, Spin } from "antd";
import React, { useState } from "react";
import { useAddSubscriptionMutation } from "../redux/api/routeApi";

export const AddSubscriptionModal = ({ openAddModal, setOpenAddModal }) => {
  const [addSubscription] = useAddSubscriptionMutation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();

    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {

    const data = {
      name: values.name,
      duration: values.duration,
      fee: values.price,
      description: values.descriptions,
    };
    setLoading(true);
    
    try {
      const response = await addSubscription(data).unwrap();
      setLoading(false);
      if (response) {
        message.success(response?.message);
        setOpenAddModal(false)
        setLoading(false);
      }
    } catch (error) {
      message.error(error?.data?.message);
      setLoading(false);
    }
    
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Add</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Package Name */}
          <Form.Item
            label="Subscription Plan Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the package name" },
            ]}
          >
            <Input className="py-2" placeholder="Enter package name" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input className="py-2" type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              placeholder="Duration"
              
              options={[
                { value: "Monthly", label: "Monthly" },
                { value: "Yearly", label: "Yearly" },
                { value: "Free", label: "Free" },
              ]}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Point Range"
            name="descriptions"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          {/* Services Selection */}

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#495F48] text-white rounded-md"
              disabled={loading}
            >
                {loading ? (
                <Spin size="small" /> 
              ) : (
                "Add"
              )}
            </button>
            <button
              type="button"
              className="px-4 py-3 w-full bg-[#D9000A] text-white rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
