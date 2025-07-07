import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


const AcquistaButton = () => {
  const { addToCart } = useCart();  
  const navigate = useNavigate();

  const vaiAlCheckout = () => {                                                       
    addToCart(product);                                                                 // Aggiungiamo il prodotto al carrello
    navigate('/checkoutbuy');                                                          // Non entriamo nel carrello ma direttamente nella pagina di checkout
  };
  return (
    <Link to={`/checkoutbuy`} onClick={vaiAlCheckout} className="text-decoration-none">
        <button className="btn btn-success p-2" onClick={() => addToCart(product)} >Acquista</button>
    </Link>
  );
};

export default AcquistaButton;  