
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import AdminPanel from "./AdminPanel";
// import ManagerPanel from "./ManagerPanel";
// import UserPanel from "./UserPanel";

export default function Dashboard() {
    const role = localStorage.getItem("role");

    return (
        <DashboardLayout>
            {/* {role === "admin" && <AdminPanel />}
            {role === "manager" && <ManagerPanel />}
            {role === "user" && <UserPanel />} */}
            <h1>All role List Her to manages</h1>
        </DashboardLayout>
    );
}
