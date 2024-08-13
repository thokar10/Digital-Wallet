import { Popover } from "antd";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { userContext } from "./contexts/userContent";
import { useContext } from "react";

const HeaderPage = ({ userInfo }: any) => {
  const userContextData = useContext(userContext);
  console.log(userInfo);
  const navigate = useNavigate();
  return (
    <>
      <div className=" bg-[darkcyan] text-white p-4 flex  items-center justify-between ">
        {/* <p className="text-[20px] ">Welcome {userInfo.name}</p> */}
        <p className="text-[20px] ">Welcome {userContextData.name} </p>

        <div className="flex gap-4">
          {/* pop up of menu */}

          <div className="hover:cursor-pointer">
            <Popover
              placement="bottom"
              content={
                <>
                  <div className="w-[12rem] flex gap-3 flex-col  text-black  items-center p-2">
                    <div className=" ">
                      {" "}
                      <div
                        className="hover:text-red-600 hover:cursor-pointer "
                        onClick={() => {
                          navigate("/editProfile");
                        }}
                      >
                        <p>Edit Profile</p>
                      </div>
                    </div>
                    <div
                      className="hover:text-red-600 hover:cursor-pointer"
                      onClick={() => {
                        navigate("/viewProfile");
                      }}
                    >
                      <p>view your Profile</p>
                    </div>
                    <div>
                      <button
                        className="dashboard p-1 border-red-500 rounded-md hover:text-red-500 hover:border-red-300 "
                        onClick={() => {
                          localStorage.removeItem("access_token");
                          navigate("/loginRegister");
                        }}
                      >
                        <p className="text-sm text-white p-1"> log Out</p>
                      </button>
                    </div>
                  </div>
                </>
              }
            >
              <div className="border-2 border-white bg-white rounded-[50%] p-2">
                <MdOutlineMenu className="text-black hover:cursor-pointer" />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderPage;
