import { useState, useEffect } from "react";
import { Avatar, Upload, Form, Input, Button, message, Spin } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { PasswordTab } from "./PasswordTab";
import Navigate from "../../Navigate";
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/api/userApi";




const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [updateProfile] = useUpdateProfileMutation()
  const {data:adminProfile} = useGetProfileQuery()
  const [loading, setLoading] = useState(false);
console.log(adminProfile)
  const [activeTab, setActiveTab] = useState("1");

  const [form] = Form.useForm();
  const [image, setImage] = useState();

  useEffect(() => {
    if (adminProfile?.data) {
      form.setFieldsValue({
        name: adminProfile?.data?.name,
        email: adminProfile?.data?.email,
        address: adminProfile?.data?.address || 'No Address',
        phone_number: adminProfile?.data?.phone_number,
      });
    }
  }, [adminProfile, form]);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  

  const handleProfileUpdate = async (values) => {
    const data = new FormData();
    if (image) data.append("profile_image", image);
    data.append("name", values.name);
    data.append("address", values.address);
    data.append("phone_number", values.phone_number);
    setLoading(true);
     try {
         const response = await updateProfile(data).unwrap(); 
         setLoading(false);
         message.success(response?.message);
       } catch (error) {
         message.error(error?.data?.message );
         setLoading(false);
       }
   
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleProfileUpdate} 
        >
        
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter your name!" },
            ]}
          >
            <Input className="py-2" placeholder="Name" />
          </Form.Item>
         

          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ type: "email", message: "Invalid email format!" }]}
          >
            <Input className="py-2" placeholder="Email" disabled />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Contact No."
            rules={[
              { required: true, message: "Please enter your contact number!" },
            ]}
          >
            <Input className="py-2" placeholder="Contact No" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: "Please enter your address!" },
            ]}
          >
            <Input className="py-2" placeholder="Address" />
          </Form.Item>

          <Form.Item>
           <div className="flex justify-center">
           <button className="bg-[#495F48] text-white py-2 px-5" type="submit" htmlType="submit" block disabled={loading}>
           {loading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
            </button>
           </div>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: <PasswordTab />,
    },
  ];

  return (
    <div className="p-1">
      <Navigate title={'Profile'}></Navigate>
      <div className="">
      <div className="max-w-xl mx-auto mt-8 rounded-lg p-6 ">
      {/* Profile Picture Section */}
      <div className="text-center mb-6">
        <div className="relative w-[140px] h-[124px] mx-auto">
          <input
            type="file"
            onChange={handleImageChange}
            id="img"
            style={{ display: "none" }}
          />
          <img
            className="w-[140px] h-[140px] rounded-full object-cover"
            src={image ? URL.createObjectURL(image) : adminProfile?.data?.profile_image}
            alt="Admin Profile"
          />
          {activeTab === "1" && (
            <label
              htmlFor="img"
              className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <IoCameraOutline className="text-black " />
            </label>
          )}
        </div>

        <p className="text-lg font-semibold mt-8">
        {adminProfile?.data?.name}
        </p>
      </div>

      {/* Custom Tabs Section */}
      <div className="mb-4">
        <div className="flex space-x-6 justify-center mb-4">
          {tabItems.map((item) => (
            <button
              key={item.key}
              className={`py-2 font-medium ${
                activeTab === item.key
                  ? "border-b border-[#495F48] text-[#495F48]"
                  : "text-black hover:text-[#02111E]"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div>{tabItems.find((item) => item.key === activeTab)?.content}</div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Profile;
