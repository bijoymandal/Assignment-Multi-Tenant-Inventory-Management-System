import PromoMarquee from "../components/PromoMarquee";
import Header from "../components/Header";
import QuickAction from "../components/quickAction";
import { Outlet } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Footer from "../components/Footer";
import PopularSearch from "../components/PopularSearch";

export default function MainLayout() {
    return (
        <>
            <PromoMarquee />
            <Header />
            <QuickAction />
            {/* <Outlet /> */}
            <HeroSlider />
            <PopularSearch />
            <Footer />
        </>
    );
}
