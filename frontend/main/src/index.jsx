import { inject } from "@vercel/analytics";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Blog from "./pages/blog";
import NotFound from "./pages/not-found";
import ReadPost from "./pages/read-post";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Blog />,
    },
    {
        path: "/:id",
        element: <ReadPost />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

inject();
