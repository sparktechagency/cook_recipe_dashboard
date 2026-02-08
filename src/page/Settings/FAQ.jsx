import { Form, Input, Modal, Button, message, Spin } from 'antd';
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import  Navigate  from '../../Navigate';
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery, useUpdateFaqMutation } from '../redux/api/settingApi';

const { TextArea } = Input;

const FAQ = () => {
  const { data: faqData = [] } = useGetFaqQuery(); 
  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [loading, setLoading] = useState(false);
  // const [faqData, setFaqData] = useState([
  //   { _id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
  //   { _id: 2, question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript recommended by React." }
  // ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addFaq] = useAddFaqMutation()
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form] = Form.useForm();
  const id = selectedFaq?._id
  
  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    form.setFieldsValue(faq);
    setIsEditModalOpen(true);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res= await addFaq(values).unwrap();
      setLoading(false);
      message.success(res?.message);
      setIsModalOpen(false);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      message.error(` ${error?.data?.message}`);
      setLoading(false);
    } 
  };

  const handleUpdateFaq = async () => {
    setLoading(true);
    
    try {
     
      const values = await form.validateFields();
      const data = {
        answer: values.answer,
        questions: values.questions,
      };
      
  
      await updateFaq({data,id}).unwrap();
      setLoading(false);
      message.success('FAQ updated successfully!');
      setIsEditModalOpen(false);
      form.resetFields();

    } catch (error) {
      message.error(`Error updating FAQ: ${error.message || error}`);
      setLoading(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    setLoading(true);
    try {
      const res = await deleteFaq( id ).unwrap(); // send { id: "..." }
      message.success(res?.message);
      setLoading(false);
    } catch (error) {
      message.error(error?.data?.message || 'Error deleting FAQ');
      setLoading(false);
    }
  };
  

  return (
    <div className=" p-1 h-screen">
      <Navigate title={'FAQ'}></Navigate>

      <div className="grid grid-cols-2 gap-5 mt-2">
        {faqData?.data?.map((faq, i) => (
          <div key={faq._id} className="p-2">
            <p className="pb-3">Question no: {i + 1}</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.questions}</p>
            <div className="flex justify-between">
              <p className="py-2">Answer</p>
              <div className="flex gap-4">
                <button onClick={() => openEditModal(faq)} className="py-2">
                  Edit
                </button>
                <div className="py-2">
                  <MdDeleteOutline onClick={() => handleDeleteFaq(faq._id)} className="text-xl cursor-pointer" />
                </div>
              </div>
            </div>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq?.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-20">
        <button className='px-5 py-2 bg-[#495F48] text-white rounded' onClick={() => setIsModalOpen(true)} type="submit" > + Add FAQ </button>
      </div>

     {/* Add FAQ Modal */}
<Modal centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
  <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
  <Form onFinish={handleSubmit} form={form}>
    <Form.Item name="questions" rules={[{ required: true, message: 'Please enter a question' }]}>
      <Input placeholder="Type question here..." />
    </Form.Item>
    <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
      <TextArea rows={4} placeholder="Type answer here..." />
    </Form.Item>
    <Form.Item>
      <div className="flex items-center justify-center mt-2">
        <Button type="primary" shape="round" size="large" htmlType="submit" style={{ background: "black", borderColor: "#495F48" }} disabled={loading}>
        {loading ? (
                <Spin size="small" /> 
              ) : (
                "Add"
              )}
        </Button>
      </div>
    </Form.Item>
  </Form>
</Modal>

{/* Edit FAQ Modal */}
<Modal centered open={isEditModalOpen} footer={null} onCancel={() => setIsEditModalOpen(false)}>
  <p className="text-center font-semibold pb-5 text-xl">Edit FAQ</p>
  <Form form={form}>
    <Form.Item name="questions" rules={[{ required: true, message: 'Please enter a question' }]}>
      <Input placeholder="Type question here..." />
    </Form.Item>
    <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
      <TextArea rows={4} placeholder="Type answer here..." />
    </Form.Item>
    <Form.Item>
      <div className="flex items-center justify-center mt-2">
        <Button type="primary" shape="round" size="large" onClick={handleUpdateFaq} style={{ background: "black", borderColor: "#495F48" }} disabled={loading}>
        {loading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
        </Button>
      </div>
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default FAQ;