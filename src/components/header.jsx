import {Link } from "react-router-dom";
export default function Header(){
      return (
            <header className="w-full h-[100px] bg-accent flex items-center p-10 justify-between">
                  <Link to="/">
                        <img src="/header-logo.png" alt="headerLogo" className="h-[80px] w-auto" />
                  </Link>
                  
                  <div className="h-full flex items-center gap-4 ">
                        <Link to="/" className="text-primary text-[1.5rem] font-semibold hover:text-2xl flex ">Home</Link>
                        <Link to="/products" className="text-primary text-[1.5rem] font-semibold hover:text-2xl flex ">Products</Link>
                        <Link to="/contact-us" className="text-primary text-[1.5rem] font-semibold hover:text-2xl flex ">Contact Us</Link>          
                  </div>
                  
                  <div >

                  </div>
            </header>
      )
}