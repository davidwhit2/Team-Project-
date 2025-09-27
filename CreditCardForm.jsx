import { useEffect, useState } from "react";

// Luhn check
function luhnOk(num) {
  const digits = num.replace(/\s+/g, "");
  let sum = 0, dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d; dbl = !dbl;
  }
  return digits.length >= 12 && sum % 10 === 0;
}

export default function CreditCardForm() {
  const [card, setCard]   = useState(localStorage.getItem("ez_card_number") || "");
  const [exp, setExp]     = useState(localStorage.getItem("ez_card_exp") || "");
  const [cvc, setCvc]     = useState(localStorage.getItem("ez_card_cvc") || "");
  const [name, setName]   = useState(localStorage.getItem("ez_card_name") || "");
  const [valid, setValid] = useState(true);

  // Enforce mask: "1234 5678 9012 3456"
  const onCardChange = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 16);
    v = v.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    setCard(v);
  };

  useEffect(() => {
    const ok = card.replace(/\s/g, "").length === 16 && luhnOk(card);
    setValid(ok);
  }, [card]);

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem("ez_card_number", card);
    localStorage.setItem("ez_card_exp", exp);
    localStorage.setItem("ez_card_cvc", cvc);
    localStorage.setItem("ez_card_name", name);
    alert("Saved card locally (demo only).");
  };

  return (
    <form onSubmit={save} style={{ maxWidth: 420 }}>
      <label style={{ display: "block", marginBottom: 8 }}>Cardholder Name
        <input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe" />
      </label>

      <label style={{ display: "block", marginBottom: 8 }}>Card Number
        <input
          required
          inputMode="numeric"
          pattern="(?:\d{4}\s){3}\d{4}"
          title="Use format 1234 5678 9012 3456"
          value={card}
          onChange={onCardChange}
          placeholder="1234 5678 9012 3456"
        />
      </label>

      {!valid && card.length >= 19 && (
        <div style={{ color: "crimson", marginTop: -8, marginBottom: 8 }}>
          Card number failed validation (Luhn).
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <label style={{ flex: 1 }}>Expiry (MM/YY)
          <input required placeholder="08/27" value={exp} onChange={(e)=>setExp(e.target.value)} />
        </label>
        <label style={{ flex: 1 }}>CVC
          <input required inputMode="numeric" maxLength={4}
                 value={cvc} onChange={(e)=>setCvc(e.target.value.replace(/\D/g, ""))}/>
        </label>
      </div>

      <button type="submit" disabled={!valid} style={{ marginTop: 12 }}>
        Save Card (localStorage)
      </button>

      <p style={{ fontSize: 12, color: "#555" }}>
        Demo only: stores fake card data in your browser’s localStorage.
        Do <strong>not</strong> use real card numbers. Use a PCI-validated processor in production.
      </p>
    </form>
  );
}
