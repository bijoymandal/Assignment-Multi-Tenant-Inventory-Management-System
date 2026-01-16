import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [dark, setDark] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <div className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between">
            <h1 className="font-semibold dark:text-white">Dashboard</h1>

            <button
                onClick={() => setDark(!dark)}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            >
                {dark ? "Light" : "Dark"}
            </button>
            <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
}
