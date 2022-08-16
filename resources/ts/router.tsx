import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, RouteProps, Navigate } from "react-router-dom";
import TaskPage from "./pages/tasks";
import LoginPage from "./pages/login";
import HelpPage from "./pages/help";
import axios from "axios";
import { useLogout, useUser } from "./queries/authQuery";
import { useAuth } from "./hooks/AuthContext";

const Router = () => {
    const logout = useLogout();
    const { isAuth, setIsAuth } = useAuth();
    const { isLoading, data: authUser} = useUser();

    useEffect(() => {
        if (authUser) {
            setIsAuth(true);
        }
    }, [authUser]);

    const GuardRoute = (props: RouteProps) => {
        if (!isAuth) return <Navigate to="/login" />
        return <Route {...props} />
    }

    const LoginRoute = (props: RouteProps) => {
        if (isAuth) return <Navigate to="/" />
        return <Route {...props} />
    }

    const navigation = (
        <nav className="global-head">
            <ul>
                <li><Link to="/">タスク一覧</Link></li>
                <li onClick={() => logout.mutate()}>ログアウト</li>
                <li><Link to="/help">ヘルプ</Link></li>
            </ul>
        </nav>
    );

    const loginNavigation = (
        <nav className="global-head">
            <ul>
                <li><Link to="/">タスク一覧</Link></li>
                <li><Link to="/login">ログイン</Link></li>
                <li><Link to="/help">ヘルプ</Link></li>
            </ul>
        </nav>
    );

    // useEffect(() => {
    //     axios.post('/api/login', {
    //         email: 'yamada@example.com',
    //         password: '123456789'
    //     }).then(response => {
    //         console.log(response);
    //     });
    // }, []);

    return (
        <BrowserRouter>
            <div>
                { isAuth ? navigation : loginNavigation }
                <Routes>
                    <Route path="/" element={<TaskPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/help" element={<HelpPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
