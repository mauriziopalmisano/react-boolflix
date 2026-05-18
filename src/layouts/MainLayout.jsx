import { Outlet } from "react-router";
import Header from "../components/Header";

function MainLayout() {
    return (
        <>
            <Header />
            <main className="container my-4">
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;