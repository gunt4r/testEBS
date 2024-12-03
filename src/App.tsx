import Home from './pages/home/index.tsx';
import Cart from "./pages/cart/index.tsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;