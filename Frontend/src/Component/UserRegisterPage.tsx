import axios from "axios";
import { Button, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";

const UserRegisterPage = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values: object) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        values
      );

      console.log(response.data.data.access_token);
      message.success("Registered successfully");
      setTimeout(() => {
        form.resetFields();
      }, 2000);

      localStorage.setItem("access_token", response.data.data.access_token);

      setTimeout(() => {
        navigate(`/dashboard`);
      }, 4000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error("failed");
      }
    }
  };

  return (
    <>
      <div className="background flex justify-center items-center w-[100vw] h-[100vh] bg-black ">
        <div className="flex w-[30rem] h-[32rem]">
          <div className="backgroundOne w-[100%] flex flex-col items-center justify-center">
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
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="confirm password"
                  name="confirm_password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="default" htmlType="submit">
                        Sign Up
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
export default UserRegisterPage;
