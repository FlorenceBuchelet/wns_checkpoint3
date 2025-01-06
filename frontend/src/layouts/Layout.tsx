import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { WorldMap } from "@/assets/world_map";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="layout__background">
                <WorldMap />
            </div>
            <Header />
            <Sidebar />
            <section className="content">{children}</section>
            <Footer />
        </>
    );
}
