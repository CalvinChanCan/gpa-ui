import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";

import './App.scss';
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Accounts from "./pages/Accounts/Accounts";
import Sidebar from "./components/Sidebar/Sidebar";


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
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/accounts",
                element: <Accounts/>
            }
        ]
    },
    {
        path: "/signin",
        element: <SignIn/>
    }

])


function App() {

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
