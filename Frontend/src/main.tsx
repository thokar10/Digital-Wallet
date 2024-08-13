import React from "react";
import ReactDOM from "react-dom/client";
import "./CSS/index.css";

import AllRoutes from "./AllRoutes";
import UserProvider from "./contexts/userContent";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Dashboard />,
//   },

//   {
//     path: "/register",
//     element: <UserRegisterPage />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//   },
//   {
//     path: "/loginRegister",
//     element: <UserRegisterLoginPage />,
//   },

//   {
//     path: "/resetPasswordVerification",
//     element: <ResetPasswordVerification />,
//   },
//   {
//     path: "/resetPasswordPage",
//     element: <ResetPasswordPage />,
//   },
//   {
//     path: "/BankToWallet/:bank_name",
//     element: <BankToWallet />,
//   },
//   {
//     path: "/editProfile",
//     element: <EditProfile />,
//   },
//   {
//     path: "/viewProfile",
//     element: <UserProfile />,
//   },
// ]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <UserProvider>
      <AllRoutes />
    </UserProvider>
  </React.StrictMode>
);
