import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function NavBar() {
  const { count } = useCart();
  return (
    <header className="nav">
      <nav className="nav-inner">
        <NavLink to="/" className="brand">EZTech Store</NavLink>
        <div className="spacer" />
        <NavLink to="/subscriptions" className="link">Subscriptions</NavLink>
        <NavLink to="/cart" className="link cart-link">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}
