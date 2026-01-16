import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
    const role = localStorage.getItem("role");
    console.log(role);

    return (
        <div className="flex bg-gray-100">
            <Sidebar role={role} />
            <div className="flex-1">
                <Navbar />
                <main className="ml-64 w-full p-6 bg-gray-50 min-h-screen">{children}</main>
            </div>
        </div>
    );
}
