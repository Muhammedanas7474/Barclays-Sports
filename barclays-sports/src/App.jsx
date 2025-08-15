import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import ProductDetails from "./pages/ProductDetails";
import ProductPage from "./pages/Products";
import Cart from "./pages/Cart";
import WhishtList from "./pages/WhishtList";

export default function App() {
  return (
    <>
      <Navbar /> {/* Navbar will show on all pages */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/whisht" element={<WhishtList />} />
      </Routes>
    </>
  );
}
