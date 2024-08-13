import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContent";

const Transaction = () => {
  const [transactionArrayData, setTransactionArrayData]: any = useState([]);
  const userContextData = useContext(userContext);

  const getTransactionHistory = async () => {
    const getAccess_token = localStorage.getItem("access_token");
    console.log(getAccess_token);
    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {},
        {
          headers: {
            Authorization: `Bearer ${getAccess_token}`,
          },
        }
      );
      if (!response) throw "unable to get data";
      setTransactionArrayData(response.data.transactionHistory);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getTransactionHistory();
  });

  const changeUserName = () => {
    userContextData.changeName("hello");
  };

  return (
    <>
      <div className="bg-black flex justify-center p-4  gap-6">
        <p className="text-white font-semibold">
          Transaction of {userContextData.name}{" "}
        </p>
        <button className="bg-slate-500 text-white" onClick={changeUserName}>
          add
        </button>
      </div>
      <div className="flex flex-col gap-4 p-5">
        {transactionArrayData.map((transactionData: any) => {
          return (
            <>
              <div className="flex justify-between p-6 border-2 border-black gap-3 bg-orange-200">
                <div>{transactionData.info}</div>
                <div>{transactionData.transaction_type}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Transaction;
