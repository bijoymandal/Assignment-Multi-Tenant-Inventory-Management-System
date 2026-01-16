export default function Sidebar() {
    const role = localStorage.getItem("role");

    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>

            <ul className="space-y-3">

                {role === "admin" && (
                    <>
                        <li className="hover:text-blue-600 cursor-pointer">
                            User Management
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                            System Settings
                        </li>
                    </>
                )}

                {role === "manager" && (
                    <>
                        <li className="hover:text-blue-600 cursor-pointer">
                            Approvals
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                            Reports
                        </li>
                    </>
                )}

                {role === "user" && (
                    <>
                        <li className="hover:text-blue-600 cursor-pointer">
                            My Profile
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                            My Orders
                        </li>
                    </>
                )}

            </ul>
        </aside>
    );
}
