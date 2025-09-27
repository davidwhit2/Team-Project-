import CreditCardForm from "../components/CreditCardForm";

export default function Checkout() {
  return (
    <section className="container">
      <h2>Checkout</h2>
      <p>Enter a demo card in the format <code>1234 5678 9012 3456</code>. Data is saved to localStorage.</p>
      <CreditCardForm />
    </section>
  );
}
