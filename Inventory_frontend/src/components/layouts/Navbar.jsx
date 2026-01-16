import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };


    return (
        <div className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between">
            <h1 className="font-semibold dark:text-white">Dashboard</h1>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
}
