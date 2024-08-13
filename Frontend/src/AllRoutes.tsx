import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";

import UserRegisterLoginPage from "./Component/UserRegisterLoginPage";

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainPage />}></Route>

          <Route
            path="/loginRegisterPage"
            element={<UserRegisterLoginPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AllRoutes;
