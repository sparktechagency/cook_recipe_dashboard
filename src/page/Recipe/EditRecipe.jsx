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
import { useEffect, useState } from "react";
import Navigate from "../../Navigate";
import { useParams } from "react-router-dom";
import {
  useGetRecipeDetailsQuery,
  useUpdateRecipeMutation,
} from "../redux/api/routeApi";
import { useGetCategoriesQuery } from "../redux/api/categoryApi";

const EditRecipe = () => {
  const { id } = useParams();
  const {
    data: recipe,
  } = useGetRecipeDetailsQuery({ id }, { refetchOnMountOrArgChange: true });
  const { data: categoriesData } = useGetCategoriesQuery({ limit: 100 });
  console.log(recipe);
  const [updateRecipe] = useUpdateRecipeMutation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (recipe) {
      form.setFieldsValue({
        name: recipe?.data?.name,
        category: recipe?.data?.category,
        prep: recipe?.data?.prep,
        weight_and_muscle: recipe?.data?.weight_and_muscle,
        flavor: recipe?.data?.flavor,
        holiday_recipes: recipe?.data?.holiday_recipes,
        instructions: recipe?.data?.instructions,
        ingredients: recipe?.data?.ingredients?.map((item) => ({
          value: item,
        })),
        serving_size: recipe?.data?.serving_size,
        calories: recipe?.data?.nutritional?.calories,
        protein: recipe?.data?.nutritional?.protein,
        carbs: recipe?.data?.nutritional?.carbs,
        fat: recipe?.data?.nutritional?.fat,
        fiber: recipe?.data?.nutritional?.fiber,
        prep_time: recipe?.data?.prep_time,
        oils: recipe?.data?.oils,
        whole_food_type: recipe?.data?.whole_food_type,
        serving_temperature: recipe?.data?.serving_temperature,
        kid_approved: recipe?.data?.kid_approved,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: recipe?.data?.image,
        },
      ]);
    }
  }, [recipe, form]);

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
    form.setFieldsValue({ cooking: [""] });
  }, [form]);

  useEffect(() => {
    form.setFieldsValue({ ingredients: [""] });
  }, [form]);

  useEffect(() => {
    form.setFieldsValue({ nutrition: [""] });
  }, [form]);

  const onFinish = async (values) => {
    const id = recipe?.data?._id;
    const newImages = fileList.filter((file) => file.originFileObj);
    console.log(id);
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
    formData.append(
      "ingredients",
      JSON.stringify(values?.ingredients.map((item) => item.value))
    );
    formData.append("prep", values?.prep);
    formData.append("holiday_recipes", values?.holiday_recipes);
    formData.append("instructions", values?.instructions);
    formData.append("serving_size", Number(values?.serving_size));
    formData.append("prep_time", values?.prep_time);
    formData.append("oils", values?.oils);
    formData.append("whole_food_type", values?.whole_food_type);
    formData.append("serving_temperature", values?.serving_temperature);

    if (newImages.length > 0) {
      newImages.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
    } else {
      formData.append("image", recipe?.data?.image);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    setLoading(true);

    try {
      const res = await updateRecipe({ data: formData, id }).unwrap();

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
      <Navigate title="Edit Recipe" />
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
                <Select style={{ height: "40px" }} placeholder={"Select Meal Type"}>
                  {categoriesData?.data?.map((category) => (
                    <Select.Option key={category._id} value={category.slug}>
                      {category.name}
                    </Select.Option>
                  ))}
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
                label="Calories"
                name="calories"
                layout="horizontal"
                rules={[{ required: true, message: "Please input calories" }]}
              >
                <Input style={{ height:"40px" }} type="number" />
              </Form.Item>

              <Form.Item
                label="Protein"
                name="protein"
                layout="horizontal"
                rules={[{ required: true, message: "Please input protein" }]}
              >
                <Input style={{ height:"40px" }} type="number" />
              </Form.Item>

              <Form.Item
                label="Carbs"
                name="carbs"
                layout="horizontal"
                rules={[{ required: true, message: "Please input carbs" }]}
              >
                <Input style={{ height:"40px" }} type="number" />
              </Form.Item>

              <Form.Item
                label="Fat"
                name="fat"
                layout="horizontal"
                rules={[{ required: true, message: "Please input fat" }]}
              >
                <Input style={{ height:"40px" }} type="number" />
              </Form.Item>

              <Form.Item
                label="Fiber"
                name="fiber"
                layout="horizontal"
                rules={[{ required: true, message: "Please input fiber" }]}
              >
                <Input style={{ height:"40px" }} type="number" />
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
                {loading ? <Spin size="small" /> : "Update"}
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

export default EditRecipe;
