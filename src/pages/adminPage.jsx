// 1. Added Link to the import list (with a capital L)
import { Routes, Route, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import AdminProductPage from "./admin/adminProductPage";
import AdminUserPage from "./admin/adminUsersPage";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex bg-primary">
            {/* Sidebar */}
            <div className="w-[400px] h-full my-0 bg-white flex flex-col shadow-2xl" >
                <div className="h-[60px] bg-white my-2">
                    <img src="/logo.png" alt="Logo" className="h-full w-auto mx-auto"/>
                </div>

                <Link to="/admin/orders" className= "w-full h-[50px] mx-2 bg-white flex items-center text-xl text-gray-500 hover:text-gray-700 gap-4" >
                    <IoCartOutline  />
                    <span >Orders</span>
                </Link>

                <Link to="/admin/products" className= "w-full h-[50px] mx-2 bg-white flex items-center text-xl text-gray-500 hover:text-gray-700 gap-4" >
                    <IoCartOutline  />
                    <span >Products</span>
                </Link>

                <Link to="/admin/users" className= "w-full h-[50px] mx-2 bg-white flex items-center text-xl text-gray-500 hover:text-gray-700 gap-4" >
                    <IoCartOutline  />
                    <span >users</span>
                </Link>

               
            </div>

            {/* Main Content Area */}
            <div className="w-[calc(100%-400px)] h-full my-0 bg-primary p-4" >
                <Routes>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/users" element={<AdminUserPage/>}/>   
                </Routes>
            </div>    
        </div>
    );
}