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
import HomePages from "./pages/homepages.jsx";
import DetailPages from "./pages/detail.jsx";
import DetailProducts from "./pages/detailProducts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPages />,
        children: [
          {
            path: "home",
            element: <HomePages />,
          },
          {
            path: "home/product/:id",
            element: <DetailProducts />,
          },
          {
            path: "detail",
            element: <DetailPages />,
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
