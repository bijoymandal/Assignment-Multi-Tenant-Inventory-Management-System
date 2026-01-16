import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
    return (
        <aside className="w-64 bg-gray-900 text-white fixed">
            <div className="p-5 text-xl font-bold border-b border-gray-700">
                Inventory SaaS
            </div>

            <nav className="p-4 space-y-3">

                <MenuItem to="/dashboard" label="Dashboard" />

                {role !== "Staff" && (
                    <>
                        <MenuItem to="/Inventory" label="Inventory" />
                        <MenuItem to="/suppliers" label="Suppliers" />
                        <MenuItem to="/purchase-orders" label="Purchase Orders" />
                    </>
                )}

                <MenuItem to="/orders" label="Orders" />

                {role === "Owner" && (
                    <MenuItem to="/users" label="User Management" />
                )}

                <MenuItem to="/logout" label="Logout" />
            </nav>
        </aside>
    );
}

function MenuItem({ to, label }) {
    return (
        <Link
            to={to}
            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
            {label}
        </Link>
    );
}
