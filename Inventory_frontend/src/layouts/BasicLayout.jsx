import PromoMarquee from "../components/PromoMarquee";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function BasicLayout() {
    return (
        <>
            <PromoMarquee />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
