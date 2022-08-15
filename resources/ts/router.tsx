import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import TaskPage from "./pages/tasks";
import LoginPage from "./pages/login";
import HelpPage from "./pages/help";



const Router = () => {
    return (
        <BrowserRouter>
            <div>
            <nav className="global-head">
                <ul>
                <li>
                    <Link to="/">タスク一覧</Link>
                </li>
                <li>
                    <Link to="/login">ログイン</Link>
                </li>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<TaskPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/help" element={<HelpPage/>} />
            </Routes>
            </div>
        </BrowserRouter>
        )
}

export default Router