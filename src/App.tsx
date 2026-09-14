import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList"; // 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">

        <Nav />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/CheckOut" element={<CheckOut />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;