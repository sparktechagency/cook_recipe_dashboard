import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAddAddMutation } from "../redux/api/settingApi";

const AddPromotionModal = ({ openAddModal, setOpenAddModal }) => {
  const[adds] = useAddAddMutation()
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("url", values?.url);


    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
    setLoading(true);

    try {
      const res= await adds(formData).unwrap();
  
      setLoading(false);
      message.success(res?.message);
      setOpenAddModal(false);
      setLoading(false);
      form.resetFields();
    } catch (error) {
      message.error(` ${error?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-4">Add promotional</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
            <Form.Item
              label="URL"
              name="url"
              rules={[
                { required: true, message: "Please input auction item name!" },
              ]}
            >
              <Input placeholder="Enter auction item name" style={{ borderRadius: "0px", padding: "6px 8px" }} />
            </Form.Item>
          
          {/* Upload */}
          <label className="block font-medium mb-2 text-gray-700">
            Add Photo or video
          </label>
          <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={true}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>

          

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#495F48] text-white rounded-md"
          >
            {loading ? <Spin size="small" /> : "Add"}
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddPromotionModal;
