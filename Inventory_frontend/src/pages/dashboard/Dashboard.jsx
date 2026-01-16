
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import AdminPanel from "./AdminPanel";
// import ManagerPanel from "./ManagerPanel";
// import UserPanel from "./UserPanel";

export default function Dashboard() {
    const role = localStorage.getItem("role");

    return (
        <DashboardLayout>
            {role === "Owner" &&
                <h1>Admin Dashboard ds fsdf sdfds fds fds fsd fsd fsdß</h1>
            }
            {role === "manager" && <ManagerPanel />}
            {role === "user" && <UserPanel />}

        </DashboardLayout>
    );
}
