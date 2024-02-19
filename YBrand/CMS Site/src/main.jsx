import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import MainPages from "./pages/mainPages.jsx";
import LoginPages from "./pages/login.jsx";
import Dashboards from "./pages/dashboard.jsx";
import Categories from "./pages/categories.jsx";
import Registers from "./pages/register.jsx";
import CreateData from "./pages/create.jsx";
import EditData from "./pages/edit.jsx";
import UpdateData from "./pages/update.jsx";

// authentication
const auth = () => {
  if (!localStorage.token) {
    return redirect("/login");
  }
  return null;
};

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPages />,
      },
      {
        path: "",
        element: <MainPages />,
        loader: auth,
        children: [
          {
            path: "dashboard",
            element: <Dashboards />,
          },
          {
            path: "dashboard/create",
            element: <CreateData />,
          },
          {
            path: "dashboard/edit/:id",
            element: <EditData />,
          },
          {
            path: "dashboard/update/:id",
            element: <UpdateData />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "register",
            element: <Registers />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
