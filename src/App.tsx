import Home from './pages/home/index.tsx';
import Cart from './pages/cart/index.tsx'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { CartProvider } from './context/CartContext.tsx'; 

function App() { 
  return ( 
    <BrowserRouter> 
      <CartProvider> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/cart" element={<Cart />} /> 
        </Routes> 
      </CartProvider> 
    </BrowserRouter> 
  ); 
} 

export default App;
