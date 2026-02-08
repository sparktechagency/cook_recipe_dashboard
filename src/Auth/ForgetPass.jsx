import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useForgotPasswordMutation } from "../page/redux/api/userApi";
import { useState } from "react";

const ForgetPass = () => {
  const navigate = useNavigate()
  const[forgotPassword] = useForgotPasswordMutation();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
   
    setLoading(true);
    forgotPassword(values)
      .unwrap()
      .then((payload) => {
        message.success("check Your Email");
        navigate("/verify");
        localStorage.setItem("email", values?.email);
        setLoading(false);
      })
      .catch((error) => message.error(error?.data?.message));
      setLoading(false);
  };

  return (
    <div className="min-h-screen  bg-[#495F48]">
      
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" md:px-16 px-5 py-16 bg-white w-[600px] rounded-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Forget Password?
              </h2>
              <p className="pb-7">
                Please enter your email to get verification code
              </p>
            </div>
            <Form
              name="forgetPassword"
              layout="vertical"
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Invalid email address",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Item>

              <Form.Item>
               
                  <button
                    type="primary"
                    htmlType="submit"
                    className="w-full py-2 mt-6 bg-[#495F48] text-white rounded  focus:ring-2 focus:ring-gray-500"
                    disabled={loading}
                  >
                      {loading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
                  </button>
              
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default ForgetPass;
