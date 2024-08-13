import { Button, Form, InputNumber, Select, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BankToWallet = () => {
  const [form] = Form.useForm();
  const { bank_name } = useParams();
  console.log(bank_name);
  const navigate = useNavigate();

  const access_token = localStorage.getItem("access_token");
  console.log(access_token);

  const onFinish = async (values: object) => {
    console.log("Success:", values);
    const access_token = await localStorage.getItem("access_token");

    const mergedObject = { ...values, bank_name };
    try {
      await axios.post(
        "http://localhost:8000/banks/bankToWallet",
        mergedObject,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // Handle response
      message.success("amount loaded successfully");

      setTimeout(() => {
        navigate("/dashboard");
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
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Amount"
                  name="user_input_balance"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input your Amount and should be a number!",
                    },
                  ]}
                >
                  <InputNumber className="w-[160px]" />
                </Form.Item>

                <Form.Item
                  label="Transaction Type"
                  name="transaction_type"
                  rules={[
                    {
                      required: true,
                      message: "choose transaction type",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="load">load</Select.Option>
                    <Select.Option value="send">send</Select.Option>
                    <Select.Option value="withdraw">withdraw</Select.Option>
                    <Select.Option value="receive">receive</Select.Option>
                  </Select>
                </Form.Item>

                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-600"
                      >
                        Proceed
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
export default BankToWallet;
