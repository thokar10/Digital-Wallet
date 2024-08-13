import axios from "axios";
import { Button, Form, Input, message } from "antd";

import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const userEmail = searchParams.get("email");

  const onFinish = async (values: object) => {
    console.log("Success:", values);
    try {
      await axios.post(
        `http://localhost:8000/users/resetPage?email=${userEmail}`,
        values
      );
      message.success("password changed successfully");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
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
                  label="OTP"
                  name="otp"
                  rules={[
                    { required: true, message: "Please input your otp!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="new_password"
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
                        Submit
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
export default ResetPasswordPage;
