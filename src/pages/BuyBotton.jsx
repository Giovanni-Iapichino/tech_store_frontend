import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AcquistaButton = () => {
  const navigate = useNavigate();

  const vaiAlCheckout = () => {                                            // Non controlliamo il carrello → vai sempre al checkout
    navigate('/checkoutbuy');
  };
  return (
    <Link to={`/checkoutbuy`} onClick={vaiAlCheckout} className="text-decoration-none">
        <button className="btn btn-success p-2" >Acquista</button>
    </Link>
  );
};

export default AcquistaButton;  