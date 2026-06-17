
import './App.css'
import ProductCard from './components/productCard'

function App() {
  

  return (
    <>
      <h1 className="text-[4rem ] font-bold text-cen   ter text-red-500">Welcome to React</h1>
      <ProductCard name="Macbook Air" price="$999" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj9_qrmeUsR9AneXH0CIPl0DgfapNWg5yYttQDrwYDA&s=10"/>
      <ProductCard name="Dell XPS" price="$1299" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj9_qrmeUsR9AneXH0CIPl0DgfapNWg5yYttQDrwYDA&s=10"/>
      <ProductCard name="HP Spectre" price="$1499" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTj9_qrmeUsR9AneXH0CIPl0DgfapNWg5yYttQDrwYDA&s=10"/>
    </>
  )
}

export default App
