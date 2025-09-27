// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CartProvider from "./context/CartContext";
import NavBar from "./components/NavBar";
import SubscriptionsPage from "./pages/Subscriptions";
import CartPage from "./pages/Cart";

// NEW imports for auth + checkout
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

function Home() {
  return (
    <section className="container">
      <h1>Welcome to EZTech Store</h1>
      <p className="muted">
        Browse <strong>Subscriptions</strong> and <strong>Accessories</strong>, then view your{" "}
        <strong>Cart</strong>.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavBar />
      <main>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Everything below requires login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </CartProvider>
  );
}
