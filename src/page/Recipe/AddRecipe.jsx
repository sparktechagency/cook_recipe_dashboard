import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Radio,
  Select,
  Spin,
  Upload,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Navigate from "../../Navigate";
import { useAddRecipeMutation } from "../redux/api/routeApi";

const AddRecipe = () => {
  const [form] = Form.useForm();
  const [addRecipe] = useAddRecipeMutation();
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

  useEffect(() => {
    form.setFieldsValue({ cooking: [""], ingredients: [""], nutrition: [""] });
  }, [form]);

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("category", values?.category);
    const nutritional = {
      calories: values?.calories,
      protein: values?.protein,
      carbs: values?.carbs,
      fat: values?.fat,
      fiber: values?.fiber,
    };
    console.log("nutri", nutritional);
    //recipe_tips
    //no weekend prep
    formData.append("nutritional", JSON.stringify(nutritional));

    formData.append("weight_and_muscle", values?.weight_and_muscle);
    formData.append("kid_approved", values?.kid_approved);
    formData.append("flavor", values?.flavor);
    formData.append("ingredients", JSON.stringify(values?.ingredients));
    formData.append("prep", values?.prep);
    formData.append("holiday_recipes", values?.holiday_recipes);
    formData.append("instructions", values?.instructions);
    formData.append("serving_size", values?.serving_size);
    formData.append("prep_time", values?.prep_time);
    formData.append("oils", values?.oils);
    formData.append("whole_food_type", values?.whole_food_type);
    formData.append("serving_temperature", values?.serving_temperature);
    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // setLoading(true);
    setLoading(true);
    try {
      const res = await addRecipe(formData).unwrap();

      setLoading(false);
      message.success(res?.message);
      // setOpenAddModal(false);
      setLoading(false);
      form.resetFields();
    } catch (error) {
      message.error(` ${error?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto ">
      <Navigate title="Add Recipe" />
      <div id="recipe" className="p-2 mt-2 bg-white h-screen">
        <Form
          form={form}
          name="dynamic_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="grid grid-cols-3 gap-11">
            <div>
              <Form.Item
                label="Recipe Name"
                name="name"
                rules={[
                  { required: true, message: "Please input recipe name!" },
                ]}
              >
                <Input style={{ height:"40px" }} placeholder="Enter recipe name" />
              </Form.Item>

              <Form.Item
                label="Meal Type"
                name="category"
                rules={[{ required: true, message: "Please select meal type" }]}
              >
                <Select style={{ height:"40px" }} placeholder="Select Event Type">
                  <Select.Option value="breakfast">Breakfast</Select.Option>
                  <Select.Option value="lunches-and-dinners">
                    Lunch
                  </Select.Option>
                  <Select.Option value="appetizers">Dinner</Select.Option>
                  <Select.Option value="salads">Appetizers</Select.Option>
                  <Select.Option value="sides">Sides</Select.Option>
                  <Select.Option value="desserts">desserts</Select.Option>
                  <Select.Option value="smoothies/shakes">
                    smoothies/shakes
                  </Select.Option>
                  <Select.Option value="soups">Soup</Select.Option>
                  <Select.Option value="salad-dressings">
                    salad-dressings
                  </Select.Option>
                  <Select.Option value="jams/marmalades">
                    jams/marmalades
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Weight Goal"
                name="weight_and_muscle"
                rules={[
                  { required: true, message: "Please select weight goal" },
                ]}
              >
                <Select style={{ height:"40px" }} placeholder="Select Event Type">
                  <Select.Option value="weight_loss">Weight Loss</Select.Option>
                  <Select.Option value="muscle_gain">Muscle Gain</Select.Option>
                  <Select.Option value="maintain_weight">
                    maintain weight
                  </Select.Option>
                </Select>
              </Form.Item>

              {/* <Form.Item
                label="Serving Size"
                name="serving_size"
                rules={[
                  { required: true, message: "Please input serving size" },
                ]}
              >
                <Input />
              </Form.Item> */}

              <Form.Item
                label="Flavour Type"
                name="flavor"
                rules={[
                  { required: true, message: "Please select flavour type" },
                ]}
              >
                <Select style={{ height:"40px" }} placeholder="Select Event Type">
                  <Select.Option value="Sweet">Sweet</Select.Option>
                  <Select.Option value="Savory">Savory</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Prep Instructions"
                name="prep"
                rules={[{ required: true, message: "Please input prep steps" }]}
              >
                <Input.TextArea />
              </Form.Item>
            </div>

            {/* Middle Column */}
            <div>
              <Form.Item
                label="Ethnic/Holiday Recipes"
                name="holiday_recipes"
                rules={[
                  {
                    required: true,
                    message: "Please select a recipe category",
                  },
                ]}
              >
                <Select style={{ height:"40px" }} placeholder="Select Event Type">
                  <Select.Option value="arabic">Arabic</Select.Option>
                  <Select.Option value="bbq">Backyard BBQ</Select.Option>
                  <Select.Option value="christmas">Christmas</Select.Option>
                  <Select.Option value="french">French</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Cooking Instruction"
                name="instructions"
                rules={[
                  { required: true, message: "Please input instructions" },
                ]}
              >
                <Input style={{ height:"40px" }}/>
              </Form.Item>

            <Form.List name="ingredients">
  {(fields, { add, remove }) => (
    <>
      <div className="pb-2 font-semibold">Ingredients</div>

      {fields.map((field) => (
        <div
          key={field.key}
          className="flex items-center gap-2 mb-3"
        >
          {/* Input Field */}
          <Form.Item
            {...field}
            name={[field.name]}
            className="flex-1"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              placeholder="Enter ingredient"
              className="w-full "
              style={{ height: "40px" }}
            />
          </Form.Item>

          {/* Remove Button */}
          {fields.length > 1 && (
            <MinusCircleOutlined
              onClick={() => remove(field.name)}
              className="text-red-500 text-xl cursor-pointer"
            />
          )}
        </div>
      ))}

 
      <div className="flex items-center gap-2">
    
        <div className="flex-[0.9]">
         
        </div>

   
        <div className="flex-[0.1]">
          <Button
            type="dashed"
            onClick={() => add()}
            icon={<PlusOutlined />}
            className="w-full flex items-center -mt-[30px] justify-center"
          >
            Add
          </Button>
        </div>
      </div>
    </>
  )}
</Form.List>


              <Form.Item
                label="Serving Size"
                name="serving_size"
                rules={[
                  { required: true, message: "Please input serving size" },
                ]}
              >
                <Input style={{ height:"40px" }} type="number" />
              </Form.Item>
              <h1 className="pb-3">Nutritional Information per Serving</h1>

              <Form.Item
                label="calories"
                name="calories"
                layout="horizontal"
                rules={[
                  { required: true, message: "Please input nutritional" },
                ]}
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-3">
                    <Input style={{ height:"40px" }} type="number" />
                  </span>
                </div>
              </Form.Item>
              <Form.Item
                label="protein"
                name="protein"
                layout="horizontal"
                rules={[
                  { required: true, message: "Please input nutritional" },
                ]}
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-3">
                    <Input style={{ height:"40px" }} type="number" />
                  </span>
                </div>
              </Form.Item>
              <Form.Item
                label="carbs"
                name="carbs"
                layout="horizontal"
                rules={[
                  { required: true, message: "Please input nutritional" },
                ]}
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-3">
                    <Input style={{ height:"40px" }} type="number" />
                  </span>
                </div>
              </Form.Item>

              <Form.Item
                label="Carbs"
                name="fat"
                layout="horizontal"
                rules={[
                  { required: true, message: "Please input nutritional" },
                ]}
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-3">
                    <Input style={{ height:"40px" }} type="number" />
                  </span>
                </div>
              </Form.Item>
              <Form.Item
                label="Fiber"
                name="fiber"
                layout="horizontal"
                rules={[
                  { required: true, message: "Please input nutritional" },
                ]}
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-3">
                    <Input style={{ height:"40px" }} type="number" />
                  </span>
                </div>
              </Form.Item>
            </div>

            {/* Right Column */}
            <div>
              <Form.Item
                label="Preparation time"
                name="prep_time"
                rules={[{ required: true, message: "Please input prep_time" }]}
              >
                <Input style={{ height:"40px" }} type="number" />
              </Form.Item>

              <Form.Item
                label="Oils"
                name="oils"
                rules={[{ required: true, message: "Please select oil type" }]}
              >
                <Select style={{ height:"40px" }} placeholder="Select Event Type">
                  <Select.Option value="oil_free">Oil Free</Select.Option>
                  <Select.Option value="with_oil">With Oil</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Whole Food Type"
                name="whole_food_type"
                rules={[{ required: true, message: "Please select food type" }]}
              >
                <Select style={{ height:"40px" }} placeholder="Select Event Type">
                  <Select.Option value="plant_based">Plant Based</Select.Option>
                  <Select.Option value="whole_food">Whole Food</Select.Option>
                  <Select.Option value="paleo">Paleo</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Serving Temp"
                name="serving_temperature"
                rules={[{ required: true, message: "Please select food type" }]}
              >
                <Radio.Group
                  options={[
                    { value: "Cold", label: "Cold" },
                    { value: "Hot", label: "Hot" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="kid_approved" valuePropName="checked">
                <Checkbox>Kid-Friendly</Checkbox>
              </Form.Item>

              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </div>
          </div>

          <Form.Item>
            <div className="flex justify-center gap-5 mt-11">
              <button
                className="bg-[#495F48] px-16 py-3 text-white rounded"
                type="submit"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Create"}
              </button>
              <button
                className="bg-red-500 px-16 py-3 text-white rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddRecipe;
