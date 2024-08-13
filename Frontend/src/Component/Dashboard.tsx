import { Button, Drawer, Form, Input, InputNumber, Modal, message } from "antd";

import axios from "axios";
import { useEffect, useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { ImFolderDownload, ImFolderUpload } from "react-icons/im";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const access_token = localStorage.getItem("access_token");

  const [AmountForm] = Form.useForm();
  const [sendMoneyForm] = Form.useForm();
  const [sendBankForm] = Form.useForm();

  const [AmountBankName, SetAmountBankName] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [LoadMoneyDrawerModel, setLoadMoneyDrawerModel] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [openLoadMoneyDrawer, setOpenLoadMoneyDrawer] = useState(false);
  const [SendMoneyModel, setSendMoneyModel] = useState(false);
  const [SendMoneyToBankModel, setSendMoneyToBankModel] = useState(false);
  const [userData, setUserData]: any = useState({});

  const navigate = useNavigate();

  //transaction type pop up

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            showTransactionLoad();
          }}
        >
          load
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            showTransactionSend();
          }}
        >
          send
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            showTransactionReceive();
          }}
        >
          receive
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            showTransactionWithdraw();
          }}
        >
          withdraw
        </div>
      ),
    },
  ];

  // transaction details modal

  //modal form on finish
  const onFinish = async (values: object) => {
    console.log("Success:", values);
    const usernamePattern = /^[a-zA-Z]+$/; // Regular expression pattern for alphabetic characters only

    if (!usernamePattern.test(values.bank_name && values.account_name)) {
      // If the username does not match the pattern, display an error message
      message.error(
        "bankname and account name can only contain alphabetic characters"
      );
      return; // Exit the function to prevent form submission
    }
    const getAccess_token = localStorage.getItem("access_token");

    try {
      await axios.post("http://localhost:8000/banks/linkBank", values, {
        headers: {
          Authorization: `Bearer ${getAccess_token}`,
        },
      });
      message.success("Bank linked successfully");

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

  //transaction history load
  const showTransactionLoad = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "load",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //transaction history Send
  const showTransactionSend = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "send",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };
  //transaction history receive
  const showTransactionReceive = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "receive",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };
  //transaction history withdraw
  const showTransactionWithdraw = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "withdraw",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setLoadMoneyDrawerModel(false);
    setSendMoneyModel(false);
    setSendMoneyToBankModel(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setLoadMoneyDrawerModel(false);
    setSendMoneyModel(false);
    setSendMoneyToBankModel(false);
  };
  const loadMoneyDrawer = () => {
    setOpenLoadMoneyDrawer(true);
  };

  const loadMoneyDrawerClose = () => {
    setOpenLoadMoneyDrawer(false);
  };
  const openSendModal = () => {
    setSendMoneyModel(true);
  };
  const openSendMoneyToBank = () => {
    setSendMoneyToBankModel(true);
  };

  // On Form submit loadMoneyDrawerModelAmount
  const isFinishLoadMoneyDrawerModelAmount = async (values: any) => {
    const bank_name = AmountBankName;
    const mergedData = { ...values, bank_name };

    try {
      await axios.post(
        "http://localhost:8000/banks/bankToWallet",
        mergedData,

        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      message.success("transferred successfully");
      getUserData(access_token);
      console.log("Form data before reset:", AmountForm.getFieldsValue());
      AmountForm.resetFields();
      setTimeout(() => {
        setOpenLoadMoneyDrawer(false);
        setLoadMoneyDrawerModel(false);
      }, 3000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //form submit of send
  const isFinishSendMoneyModel = async (values: any) => {
    try {
      await axios.post("http://localhost:8000/banks/userToUser", values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      message.success("Transferred successfully");

      getUserData(access_token);
      sendMoneyForm.resetFields();

      setTimeout(() => {
        setSendMoneyModel(false);
      }, 3000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //form submit of bank
  const isFinishSendMoneyToBankModel = async (values: any) => {
    try {
      await axios.post("http://localhost:8000/banks/walletToBank", values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      message.success("Transferred successfully");
      getUserData(access_token);
      sendBankForm.resetFields();

      setTimeout(() => {
        setSendMoneyToBankModel(false);
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

  useEffect(() => {
    const getAccess_token = localStorage.getItem("access_token");
    console.log(getAccess_token);

    if (!getAccess_token) {
      navigate("/loginRegister");
    }

    getUserData(getAccess_token);
    getUserBankLinkedNames(getAccess_token);
  }, []);

  //get bank names
  const getUserBankLinkedNames = async (getAccess_token: any) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/banks/bankDetails",
        {
          headers: {
            Authorization: `bearer ${getAccess_token}`,
          },
        }
      );

      console.log(response.data);
      console.log(response.data.details);
      setBankDetails(response.data.details);
    } catch (e) {
      alert(e);
    }
  };
  //get user data
  const getUserData = async (getAccess_token: any) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/users/my-profile",
        {
          headers: {
            Authorization: `bearer ${getAccess_token}`,
          },
        }
      );

      console.log(response.data.userInfo);
      setUserData(response.data.userInfo);
    } catch (e) {
      message.error("Failed to get  your data");
    }
  };

  return (
    <>
      {/* Balance div */}
      <div className="flex justify-center flex-grow-1 bg-[darkcyan] p-7 ">
        <div className="balance  bg-[white] border-2 border-[rgb(0 0 0 / 35%)] rounded-lg flex items-center p-5 flex-grow-1">
          <p className="text-[60px] text-black">Balance :&nbsp;</p>
          <p className="text-[60px] text-black p-1"> Rs {userData.balance} </p>
        </div>
      </div>

      {/* loadMoney Drawer */}
      <div>
        <div className="relative">
          <Drawer
            title={
              <div
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                All Linked Banks
              </div>
            }
            onClose={loadMoneyDrawerClose}
            open={openLoadMoneyDrawer}
            width={300}
            placement="right"
            style={{ background: "cadetblue" }}
          >
            <div className="flex flex-col gap-5">
              {bankDetails.map((data: any) => {
                return (
                  <>
                    <div
                      className="flex justify-center border-2 border-white text-white p-2 hover:cursor-pointer hover:bg-red-400 bg-[darkcyan]"
                      onClick={() => {
                        // navigate(`/BankToWallet/${data.bank_name}`);
                        setLoadMoneyDrawerModel(true);
                        SetAmountBankName(data.bank_name);
                      }}
                    >
                      <div>{data.bank_name}</div>
                    </div>
                  </>
                );
              })}
              <div className="flex justify-center">
                <Button
                  type="default"
                  className="bg-white text-black "
                  onClick={showModal}
                >
                  Add Bank
                </Button>
              </div>
            </div>
            <Modal
              title="Fill up all the  details "
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              cancelButtonProps={{
                style: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                },
              }}
              okButtonProps={{
                style: { backgroundColor: "blue", borderColor: "blue" },
              }}
              footer={null}
            >
              <div>
                {" "}
                <div>
                  <Form
                    form={AmountForm}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Bank Name"
                      name="bank_name"
                      rules={[
                        { required: true, message: "Please input Bank name!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account Name"
                      name="account_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input account  name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account Number"
                      name="account_no"
                      rules={[
                        {
                          required: true,
                          message: "Please input account  number!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="default" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Modal>

            <div>
              <Modal
                title="Enter Amount"
                open={LoadMoneyDrawerModel}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{
                  style: {
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
                  },
                }}
                okButtonProps={{
                  style: { backgroundColor: "blue", borderColor: "blue" },
                }}
              >
                <Form
                  form={AmountForm}
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={isFinishLoadMoneyDrawerModelAmount}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Amount"
                    name="user_input_balance"
                    rules={[
                      {
                        required: true,
                        message: "Please enter amount!",
                      },
                    ]}
                  >
                    <InputNumber className="w-[10rem]" />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </Drawer>
        </div>
      </div>

      {/* sendMoney Drawer */}
      <div>
        <Modal
          title="User Details"
          open={SendMoneyModel}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{
            style: {
              backgroundColor: "red",
              borderColor: "red",
              color: "white",
            },
          }}
          okButtonProps={{
            style: { backgroundColor: "blue", borderColor: "blue" },
          }}
          footer={null}
        >
          <Form
            form={sendMoneyForm}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={isFinishSendMoneyModel}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter amount!",
                },
              ]}
            >
              <Input className="w-[15rem]" />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="user_input_balance"
              rules={[
                {
                  required: true,
                  message: "Please enter amount!",
                },
              ]}
            >
              <InputNumber className="w-[15rem]" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="default"
                htmlType="submit"
                onClick={isFinishSendMoneyModel}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* BankToBank Drawer */}
      <div>
        <div>
          <Modal
            title="Bank Details"
            open={SendMoneyToBankModel}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{
              style: {
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              },
            }}
            okButtonProps={{
              style: { backgroundColor: "blue", borderColor: "blue" },
            }}
            footer={null}
          >
            <Form
              form={sendBankForm}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={isFinishSendMoneyToBankModel}
              autoComplete="off"
            >
              <Form.Item
                label="Account Number"
                name="account_no"
                rules={[
                  {
                    required: true,
                    message: "Please enter Account Number!",
                  },
                ]}
              >
                <InputNumber className="w-[15rem]" />
              </Form.Item>
              <Form.Item
                label="Bank Name"
                name="bank_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Bank name!",
                  },
                ]}
              >
                <Input className="w-[15rem]" />
              </Form.Item>
              <Form.Item
                label="Amount"
                name="user_input_balance"
                rules={[
                  {
                    required: true,
                    message: "Please enter amount!",
                  },
                ]}
              >
                <InputNumber className="w-[15rem]" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="default"
                  htmlType="submit"
                  onClick={isFinishSendMoneyToBankModel}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      {/* This is area below balance */}

      <div className="p-5 flex justify-center flex-grow-1 ">
        <div className="bg-[darkcyan] w-[80%] h-[10rem] flex p-4 gap-[20rem] justify-center">
          <div className=" text-white flex-grow-1 flex-col flex items-center justify-center hover:cursor-pointer gap-2 ">
            <span className="ALL text-[4rem] ">
              <ImFolderDownload onClick={loadMoneyDrawer} />
            </span>
            <p className="text-white ">Load Money</p>
          </div>
          <div className=" text-white flex-grow-1 flex-col flex items-center  justify-center hover:cursor-pointer gap-2  ">
            <span className=" ALL text-[4rem] ">
              <ImFolderUpload onClick={openSendModal} />
            </span>
            <p className="text-white ">send Money</p>
          </div>
          <div className=" text-white flex-grow-1 flex-col flex items-center  justify-center hover:cursor-pointer gap-2  ">
            <span className="ALL text-[4rem] ">
              <BsBank2 onClick={openSendMoneyToBank} />
            </span>
            <p className="text-white">Bank Transfer</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
