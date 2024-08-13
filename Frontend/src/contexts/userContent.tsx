import { createContext, useState } from "react";

export const userContext = createContext({
  name: "sabin",
  changeName: (nameValue: any) => {},
  userDetails: {},
  getUserDetails: (data: object) => {},
});
const UserProvider = (props: any) => {
  const [name, setName] = useState("ok");
  const [userDetails, setUserDetails] = useState({});

  const changeName = (nameValue: any) => {
    setName(nameValue);
  };

  const getUserDetails = (data: object) => {
    setUserDetails(data);
  };

  return (
    <>
      <userContext.Provider
        value={{
          name: name,
          changeName: changeName,
          userDetails: userDetails,
          getUserDetails: getUserDetails,
        }}
      >
        {props.children}
      </userContext.Provider>
    </>
  );
};
export default UserProvider;
