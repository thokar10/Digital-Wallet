import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    onFinish();
  }, []);

  const onFinish = async (values: object) => {
    console.log(values);
    const getAccess_token = localStorage.getItem("access_token");
    console.log(getAccess_token);
    try {
      const response = await axios.get(
        "http://localhost:8000/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${getAccess_token}`,
          },
        }
      );

      console.log(response.data.userInfo);
      const newValues = {
        name: response.data.userInfo.name,
        phone_no: response.data.userInfo.phone_no,
        Location: response.data.userInfo.Location,
        email: response.data.userInfo.email,
      };
      form.setFieldsValue(newValues);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //

  return (
    <>
      <div className="background flex justify-center items-center w-[100vw] h-[100vh] bg-black ">
        <div className="flex w-[30rem] h-[32rem]">
          <div className="backgroundOne w-[100%] flex flex-col items-center justify-center rounded-3xl opacity-[0.94] ">
            <div className="p-1 w-[400px]">
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your location!" },
                  ]}
                >
                  <Input readOnly />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                >
                  <Input readOnly />
                </Form.Item>

                <Form.Item
                  label="Phone No"
                  name="phone_no"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "260px" }} readOnly />
                </Form.Item>
                <Form.Item
                  label="Location"
                  name="Location"
                  rules={[
                    { required: true, message: "Please input your location!" },
                  ]}
                >
                  <Input readOnly />
                </Form.Item>

                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        type="default"
                        className="bg-black text-white"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Back
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
