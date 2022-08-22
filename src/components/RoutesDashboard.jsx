import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const RoutesDashboard = () => {
    return (
        <div className="flex flex-row">
            <div className="bg-black h-screen sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="bg-gradient-to-r from-gray-500 to-blue-900 w-full">
                <div className="mx-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};