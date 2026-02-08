import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useUpdateAddMutation } from "../redux/api/settingApi";


const EditPromotionModal = ({ editModal, setEditModal, selectedAdd }) => {
  const [editAdd] = useUpdateAddMutation()

    const [form] = Form.useForm();
   const [fileList, setFileList] = useState([]);
   const [loading, setLoading] = useState(false);
   const onChange = ({ fileList: newFileList }) => {
     setFileList(newFileList);
   };

   useEffect(() => {
    if (selectedAdd) {
      form.setFieldsValue({
        url: selectedAdd?.url,
        details: selectedAdd?.details,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: selectedAdd?.image,
        },
      ]);
    }
  }, [selectedAdd, form]);
 
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
      setEditModal(false);
    };
  
    const handleSubmit = async (values) => {
      const id = selectedAdd?.key; 
   
    
      const existingImages = fileList.filter((file) => file.url);
      const newImages = fileList.filter((file) => file.originFileObj);
    
      const formData = new FormData();
      formData.append("url", values?.url);
      if (newImages.length > 0) {

        newImages.forEach((file) => {
          formData.append("image", file.originFileObj);
        });
      } else {
        formData.append("image", selectedAdd?.image); 
      }
    
      setLoading(true);
    
      try {
        const res = await editAdd({ data: formData, id }).unwrap();
      
        setLoading(false);
        message.success(res?.message);
        setFileList((prevFileList) => prevFileList.filter((file) => file.url));
        setEditModal(false);
        setLoading(false);
        form.resetFields();
      } catch (error) {
        message.error(`${error?.data?.message}`);
        setLoading(false);
      }
    };
    
  
    return (
      <Modal
        centered
        open={editModal}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <div className="mb-6 mt-2">
          <h2 className="text-center font-semibold text-xl mb-4">Edit promotional</h2>
  
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
            {loading ? <Spin size="small" /> : "Update"}
          </button>
        </Form>
        </div>
      </Modal>
    );
}

export default EditPromotionModal