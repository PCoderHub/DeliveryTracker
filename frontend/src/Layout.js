import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";

const Layout = () => {
    const user = useSelector((state) => state?.token.token);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (user?.username) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user, isLoggedIn]);

    return <main>
        {isLoggedIn ?? false ? <Outlet/> : <Login />}
    </main>
}

export default Layout;