import { message } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HeaderPage from "./HeaderPage";
import Dashboard from "./Component/Dashboard";
import Transaction from "./Component/Transaction/Transaction";
import { userContext } from "./contexts/userContent";

const MainPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const userContextData = useContext(userContext);

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
      userContextData.changeName(response.data.userInfo.name);
      userContextData.userDetails(response.data.userInfo);
    } catch (e) {
      message.error("Failed to get  your data");
    }
  };

  useEffect(() => {
    const getAccess_token = localStorage.getItem("access_token");
    console.log(getAccess_token);

    if (!getAccess_token) {
      navigate("/loginRegisterPage");
    }

    getUserData(getAccess_token);
  }, []);

  return (
    <>
      <div className="flex overflow-hidden w-[100vw] h-[100vh]">
        <div className="h-[100vh] w-[10vw] bg-[aliceblue] flex flex-col gap-3 items-center py-20">
          <div className="bg-black p-2 rounded-md hover:cursor-pointer ">
            <p
              className="text-white hover:text-red-300"
              onClick={() => {
                navigate("/");
              }}
            >
              Dashboard
            </p>
          </div>
          <div
            className="bg-black p-2 rounded-md  hover:cursor-pointer hover:border-white hover:border-1"
            onClick={() => {
              navigate("/transaction");
            }}
          >
            <p className="text-white hover:text-red-300">Transaction</p>
          </div>
        </div>

        <div className=" w-[90vw] flex flex-col h-[100vh]">
          {" "}
          <div>
            {" "}
            <HeaderPage className="w-[100vw]" userInfo={userData} />
          </div>
          <div className="h-[90vh] overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>

              <Route path="/transaction" element={<Transaction />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
