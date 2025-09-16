import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import list from "../data";

export default function SubscriptionsPage() {
  const { addItem, hasSubscription } = useCart();
  const [warn, setWarn] = useState("");

  const subscriptions = list.filter(item => item.id <= 4);
  const accessories = list.filter(item => item.id > 4);

  function handleAdd(product) {
    setWarn("");
    const ok = addItem(product, { onWarn: setWarn });
    if (!ok) return;
  }

  return (
    <section className="container">
      <h1>Subscriptions</h1>
      {warn && <div className="warn">{warn}</div>}

      <div className="grid">
        {subscriptions.map(sub => (
          <article key={sub.id} className="card">
            <img src={sub.img} alt={sub.service} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{sub.service}</h3>
            <p className="muted">{sub.serviceInfo}</p>
            <div className="row">
              <span className="price">${sub.price.toFixed(2)}</span>
              <button
                className="btn"
                onClick={() => handleAdd({ ...sub, title: sub.service, description: sub.serviceInfo, img: sub.img, type: "subscription" })}
                disabled={hasSubscription}
              >
                {hasSubscription ? "Subscription in Cart" : "Add"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <h2 style={{ marginTop: 32 }}>EZTech Accessories</h2>
      <p className="muted">You can add multiple accessories (shirts, phone cases, etc.).</p>

      <div className="grid">
        {accessories.map(acc => (
          <article key={acc.id} className="card">
            <img src={acc.img} alt={acc.service} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{acc.service}</h3>
            <p className="muted">{acc.serviceInfo}</p>
            <div className="row">
              <span className="price">${acc.price.toFixed(2)}</span>
              <button
                className="btn"
                onClick={() => addItem({ ...acc, title: acc.service, description: acc.serviceInfo, img: acc.img, type: "accessory" })}
              >
                Add
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
