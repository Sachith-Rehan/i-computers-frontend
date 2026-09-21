import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import HomePage from './pages/homePage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import AdminPage from './pages/adminPage.jsx'
import TestPage from './pages/testPage.jsx'
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    
    
    <div className="w-full h-screen bg-red-500">
      <Toaster position='top-right'/>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element= {<TestPage />} /> 
      </Routes >
    </div> 
   
    // <>
    //   <h1 className="text-[4rem ] font-bold text-cen   ter text-red-500">Welcome to React</h1>
    //   <ProductCard name="Macbook Air" price="$999" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj9_qrmeUsR9AneXH0CIPl0DgfapNWg5yYttQDrwYDA&s=10"/>
    //   <ProductCard name="Dell XPS" price="$1299" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj9_qrmeUsR9AneXH0CIPl0DgfapNWg5yYttQDrwYDA&s=10"/>
    //   <ProductCard name="HP Spectre" price="$1499" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj9_qrmeUsR9AneXH0CIPl0DgfapNWg5yYttQDrwYDA&s=10"/>
    // </>
  )
}

export default App
