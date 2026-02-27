import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); 
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  
  const applyCoupon = () => {
    if (coupon === 'OFFER50') {
      setDiscount(totalPrice * 0.5);
      alert('🔥 50% Discount Applied!');
    } else if (coupon === 'SAVE20') {
      setDiscount(totalPrice * 0.2);
      alert('✅ 20% Discount Applied!');
    } else {
      alert('Invalid Coupon Code');
      setDiscount(0);
    }
  };

  const finalAmount = totalPrice - discount;

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your Cart is Empty 🛒</h2>
        <button onClick={() => navigate('/home')} style={{ padding: '10px 20px', marginTop: '20px' }}>Go Back to Home</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      
      {/* Step 1: Order Summary */}
      {step === 1 && (
        <div>
          <h2 style={{ borderBottom: '2px solid #e67e22', paddingBottom: '10px' }}>Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
              <span>{item.name}</span>
              <strong>₹{item.price}</strong>
            </div>
          ))}

          {/* Offers Section */}
          <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>Available: <b>OFFER50</b> (50% Off)</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Promo Code" 
                value={coupon} 
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
              <button onClick={applyCoupon} style={{ padding: '10px 20px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Apply</button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <p>Subtotal: ₹{totalPrice}</p>
            <p style={{ color: '#27ae60' }}>Discount: -₹{discount}</p>
            <h3 style={{ fontSize: '24px' }}>Total Amount: ₹{finalAmount}</h3>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '15px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>Proceed to Checkout</button>
          </div>
        </div>
      )}

      {/* Step 2: Fake Payment Interface */}
      {step === 2 && (
        <div>
          <h2 style={{ borderBottom: '2px solid #2ecc71', paddingBottom: '10px' }}>Secure Payment</h2>
          <p style={{ fontSize: '18px' }}>Amount to Pay: <strong style={{ color: '#27ae60' }}>₹{finalAmount}</strong></p>
          
          <div style={{ marginTop: '20px' }}>
            <label>Card Number</label>
            <input type="text" placeholder="xxxx xxxx xxxx xxxx" style={{ width: '100%', padding: '12px', margin: '10px 0', boxSizing: 'border-box' }} />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '12px', marginTop: '10px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>CVV</label>
                <input type="password" placeholder="***" style={{ width: '100%', padding: '12px', marginTop: '10px' }} />
              </div>
            </div>

            <button 
              onClick={() => { setStep(3); clearCart(); }} 
              style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', marginTop: '30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Pay Now (Fake Gateway)
            </button>
            <button onClick={() => setStep(1)} style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>Back to Summary</button>
          </div>
        </div>
      )}

      {/* Step 3: Success Screen */}
      {step === 3 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '80px', color: '#2ecc71' }}>✅</div>
          <h1 style={{ color: '#2c3e50' }}>Order Confirmed!</h1>
          <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Thank you for your order. Your delicious food is being prepared and will reach you in 30-40 minutes.</p>
          <button onClick={() => navigate('/home')} style={{ padding: '12px 30px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}>Order More Food</button>
        </div>
      )}
    </div>
  );
};

export default Cart;