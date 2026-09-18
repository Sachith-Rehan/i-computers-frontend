import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// Added IoMenu and IoClose for mobile navigation toggling
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5"; 
import AdminProductPage from "./admin/adminProductPage";
import AdminUserPage from "./admin/adminUsersPage";
import AdminAddProductForm from "./admin/adminAddProductForm";

export default function AdminPage() {
    // State to handle the mobile sidebar toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Helper to close sidebar on mobile when a link is clicked
    const handleCloseSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="w-full h-screen flex bg-primary overflow-hidden">
            
            {/* --- Mobile Header --- */}
            {/* Visible only on screens smaller than 'md' */}
            <div className="md:hidden w-full h-[60px] bg-white flex items-center justify-between px-4 shadow-md absolute top-0 left-0 z-40">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto"/>
                <button 
                    onClick={() => setIsSidebarOpen(true)} 
                    className="text-3xl text-gray-700 hover:text-gray-900"
                >
                    <IoMenu />
                </button>
            </div>

            {/* --- Mobile Overlay --- */}
            {/* Darkens the background when the sidebar is open on mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
                    onClick={handleCloseSidebar}
                ></div>
            )}

            {/* --- Sidebar --- */}
            {/* Absolute positioning on mobile (slides in/out), static on desktop */}
            <div 
                className={`fixed md:static inset-y-0 left-0 z-50 w-[300px] lg:w-[400px] h-full bg-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} 
            >
                <div className="h-[60px] bg-white my-2 flex items-center justify-between px-4 md:px-0">
                    <img src="/logo.png" alt="Logo" className="h-full w-auto mx-auto"/>
                    {/* Close button for mobile inside the sidebar */}
                    <button 
                        onClick={handleCloseSidebar} 
                        className="md:hidden text-3xl text-gray-500 hover:text-gray-700"
                    >
                        <IoClose />
                    </button>
                </div>

                <div className="flex flex-col gap-2 mt-4 px-2">
                    <Link onClick={handleCloseSidebar} to="/admin/orders" className="w-full h-[50px] px-4 bg-white flex items-center text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg gap-4 transition-colors">
                        <IoCartOutline />
                        <span>Orders</span>
                    </Link>

                    <Link onClick={handleCloseSidebar} to="/admin/products" className="w-full h-[50px] px-4 bg-white flex items-center text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg gap-4 transition-colors">
                        <IoCartOutline />
                        <span>Products</span>
                    </Link>

                    <Link onClick={handleCloseSidebar} to="/admin/users" className="w-full h-[50px] px-4 bg-white flex items-center text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg gap-4 transition-colors">
                        <IoCartOutline />
                        <span>Users</span>
                    </Link>
                </div>
            </div>

            {/* --- Main Content Area --- */} 
            {/* flex-1 takes up all remaining space instead of relying on exact pixel calculation */}
            {/* Added pt-20 on mobile to push content below the fixed mobile header */}
            <div className="flex-1 h-full bg-primary p-4 pt-20 md:pt-4 overflow-y-auto" >
                <Routes>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/users" element={<AdminUserPage/>}/> 
                    <Route path="/add-product" element={<AdminAddProductForm/>}/> 
                </Routes>
            </div>    
        </div>
    );
}