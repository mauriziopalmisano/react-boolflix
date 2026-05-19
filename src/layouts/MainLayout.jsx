import { Outlet } from "react-router";
import Header from "../components/Header";

function MainLayout() {
    return (

        <div className="bg-dark">
            <Header />
            <main className="container my-4 ">
                <Outlet />
            </main>
        </div>

    );
}

export default MainLayout;