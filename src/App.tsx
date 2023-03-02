import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";

import './App.css';
import Home from "./pages/Home/Home";

const Layout = () => {
    return (
        <div className="app">
            <Outlet/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
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
