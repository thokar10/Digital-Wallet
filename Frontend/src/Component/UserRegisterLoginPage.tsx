import { Button, Form, Input, Spin, message } from "antd";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegisterLoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);

  const onFinish = async (values: object) => {
    console.log("Success:", values);

    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        values
      );
      // console.log(response.data);
      // console.log(response.data.access_token);

      localStorage.setItem("access_token", response.data.access_token);

      message.success("login successfully");
      setTimeout(() => {
        setSpin(true);
      }, 1000);

      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000);
    } catch (e: any) {
      console.log(e.response.data.message);
      const errorMessage = e.response.data.message;

      if (errorMessage) {
        message.error(e.response.data.message);
      } else {
        message.error("failed");
      }
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center w-[100vw] h-[100vh] bg-black ">
        <div className="flex w-[60rem] h-[32rem]">
          <div className=" w-[50%] bg-white flex flex-col items-center justify-center">
            {spin ? (
              <>
                {" "}
                <Spin size="large" />
              </>
            ) : (
              <>
                {" "}
                <div className="p-1 w-[400px]">
                  <div className="p-5"> </div>{" "}
                  <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
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
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <div className="flex justify-center">
                      <div className="flex gap-1">
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                          <Button type="default" htmlType="submit">
                            Login
                          </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                          <Button
                            type="default"
                            htmlType="submit"
                            onClick={() => {
                              navigate("/register");
                            }}
                          >
                            Sign Up
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                  <div className="flex justify-center items-center gap-2">
                    <p>If you forget your password</p>
                    <button
                      className="border-2  rounded-[7px] p-[3px] "
                      onClick={() => {
                        navigate("/resetPasswordVerification");
                      }}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="background  w-[50%]"></div>
        </div>
      </div>
    </>
  );
};
export default UserRegisterLoginPage;
