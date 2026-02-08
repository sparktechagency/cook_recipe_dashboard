import { useState } from "react";
import OTPInput from "react-otp-input";

import { Link, useNavigate } from "react-router-dom";
import { useResentVerifyOtpMutation, useVerifyOtpMutation } from "../page/redux/api/userApi";
import { message, Spin } from "antd";

const Verify = () => {
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendVerifyOtp] = useResentVerifyOtpMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const data = {
      code: otp,
      email: localStorage.getItem("email"),
    };
    setLoading(true);
    try {
      const response = await verifyOtp(data).unwrap();
      setLoading(false);
      message.success(response?.message);
      navigate("/reset");
    } catch (error) {
      console.error(error); 
      message.error(error?.data?.message );
      setLoading(false);
    }
  };

  const handleResend =async () => {
    const data = {
      email: localStorage.getItem("email"),
    };
    try {
      const response =await resendVerifyOtp(data).unwrap();
      
      message.success(response.message);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Failed to resend OTP!");
    }
  };

  return (
    <div className="min-h-screen  bg-[#495F48]">
      
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" bg-white rounded-2xl lg:w-[500px] md:px-16 px-5 py-16 ">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Check your email
            </h2>
            <h3 className="text-[#333333] text-center mb-5">
              We sent a reset link to {localStorage.getItem("email")}. Enter the 6-digit
              code mentioned in the email.
            </h3>
            <div className="flex justify-center mb-5">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-1"></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-16 h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{ width: "40px", height: "50px" }}
                  />
                )}
              />
            </div>

         <button
              onClick={handleVerify}
              className="w-full py-2 bg-[#495F48] text-white rounded-md mb-4"
            >
              Verify Code
            </button>

            <span className="flex justify-center ">
              You have not received the email?{" "}
              <span
                onClick={handleResend}
                className="text-[#495F48] cursor-pointer pl-2"
                disabled={loading}
              >
                   {loading ? (
                <Spin size="small" /> 
              ) : (
                "Verify"
              )}
              </span>
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Verify;
