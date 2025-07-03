import { useLocation } from "react-router-dom";

export default function OrderSummaryPage() {
  const location = useLocation();
  const orderNumber = location.state?.order_number;

  return (
    <div className="container mt-5">
      <h2>Grazie per il tuo ordine!</h2>
      {orderNumber && (
        <div className="alert alert-success">
          Il tuo numero d'ordine è: <strong>{orderNumber}</strong>
        </div>
      )}
      <h4>A breve riceverai una email di conferma!!</h4>
    </div>
  );
}
