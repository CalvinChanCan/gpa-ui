import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";

import './App.scss';
import SignIn from "./pages/SignIn/SignIn";
import Accounts from "./pages/Accounts/Accounts";
import Transactions from "./pages/Transactions/Transactions";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";
import SignUp from "./pages/SignUp/SignUp";


const Layout = () => {
    return (
        <div className="app">
            <div className="left">
                <Sidebar/>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/accounts",
                element: <Accounts/>
            },
            {
                path: "/transactions",
                element: <Transactions/>
            }
        ]
    },

])


function App() {

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
