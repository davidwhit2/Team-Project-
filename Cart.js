import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, total, updateQty, removeItem, clear } = useCart();

  return (
    <section className="container">
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map(i => (
              <li key={i.id} className="cart-item">
                <div className="cart-main">
                  <img
                    src={i.img}
                    alt={i.title}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "12px" }}
                  />
                  <div>
                    <div className="title">
                      {i.title}{" "}
                      {i.type === "subscription" && (
                        <span className="chip">Subscription</span>
                      )}
                    </div>
                    <div className="muted">${i.price.toFixed(2)} each</div>
                  </div>
                </div>

                <div className="cart-actions">
                  <label className="qty">
                    Qty:
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={e => updateQty(i.id, Number(e.target.value || 1))}
                    />
                  </label>
                  <button className="link danger" onClick={() => removeItem(i.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <div className="total">
              Total: <strong>${total.toFixed(2)}</strong>
            </div>
            <div className="row">
              <button className="btn ghost" onClick={clear}>
                Clear Cart
              </button>
              <button className="btn">Checkout</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
