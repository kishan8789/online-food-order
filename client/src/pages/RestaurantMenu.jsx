import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const foodRes = await API.get(`/restaurants/${id}/food`);
        setFoods(foodRes.data);
        const restRes = await API.get('/restaurants');
        setRestaurant(restRes.data.find(r => r._id === id));
      } catch (err) { console.error(err); }
    };
    fetchMenu();
  }, [id]);

  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* --- 1. HEADER / NAVIGATION --- */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '15px 8%', background: '#fff', position: 'sticky', top: 0, zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <button 
          onClick={() => navigate('/home')} 
          style={{ background: '#f1f2f6', border: 'none', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}
        >
          ← Back
        </button>
        
        <button 
          onClick={() => navigate('/cart')} 
          style={{
            padding: '12px 25px', backgroundColor: '#27ae60', color: 'white', border: 'none', 
            borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', gap: '10px',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
          }}
        >
          🛒 Cart ({cart.length})
        </button>
      </nav>

      {/* --- 2. RESTAURANT BANNER --- */}
      <div style={{ 
        textAlign: 'center', padding: '60px 20px', backgroundColor: '#2d3436', color: 'white',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${restaurant?.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <h1 style={{ fontSize: '42px', margin: '0 0 10px 0', letterSpacing: '1px' }}>{restaurant?.name}</h1>
        <p style={{ fontSize: '18px', opacity: '0.8', maxWidth: '600px', margin: '0 auto 20px' }}>{restaurant?.description}</p>
        <div style={{ 
          backgroundColor: '#f1c40f', color: '#000', display: 'inline-block', 
          padding: '8px 20px', borderRadius: '25px', fontSize: '14px', fontWeight: '800',
          boxShadow: '0 4px 10px rgba(241, 196, 15, 0.4)'
        }}>
          🔥 LIMITED OFFER: Use OFFER50
        </div>
      </div>

      {/* --- 3. FOOD MENU GRID --- */}
      <div style={{ padding: '40px 8%' }}>
        <h2 style={{ color: '#2d3436', marginBottom: '30px', fontSize: '28px', borderBottom: '3px solid #e67e22', display: 'inline-block' }}>
          Explore Menu
        </h2>

        <div className="grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px'
        }}>
          {foods.map((food) => (
            <div 
              key={food._id} 
              className="card" 
              style={{ 
                background: '#fff', borderRadius: '20px', overflow: 'hidden', 
                boxShadow: '0 8px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f1f1',
                transition: '0.3s'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={food.image} alt={food.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ 
                  position: 'absolute', top: '15px', left: '15px', background: 'white', 
                  padding: '5px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', color: '#27ae60'
                }}>
                  ● Non-Veg / Veg
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#2d3436', fontSize: '20px' }}>{food.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ color: '#27ae60', fontWeight: '800', fontSize: '22px' }}>₹{food.price}</span>
                  <span style={{ fontSize: '12px', color: '#b2bec3' }}>★ 4.5 Rating</span>
                </div>
                
                <button 
                  onClick={() => addToCart(food)}
                  style={{ 
                    width: '100%', padding: '15px', backgroundColor: '#e67e22', color: 'white', 
                    border: 'none', borderRadius: '12px', cursor: 'pointer',
                    fontSize: '16px', fontWeight: 'bold', transition: '0.3s',
                    boxShadow: '0 5px 15px rgba(230, 126, 34, 0.2)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d35400'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e67e22'}
                >
                  Add to Cart +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;