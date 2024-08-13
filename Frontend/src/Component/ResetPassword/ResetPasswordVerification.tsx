import { Button, Form, Input, message } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const ResetPasswordVerification = () => {
  interface FormValues {
    email: string;
    // other properties as needed
  }
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: FormValues) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/reset_password_verify",
        values
      );

      const userEmail = values.email;

      navigate(`/resetPasswordPage?email=${userEmail}`);

      alert(response.data.message);
      // navigate("/resetPasswordPage");
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
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        type="default"
                        className="bg-black text-white"
                        htmlType="submit"
                      >
                        Verify
                      </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        type="default"
                        className="bg-black text-white"
                        onClick={() => {
                          navigate(-1);
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
export default ResetPasswordVerification;
