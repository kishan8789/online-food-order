import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Cart count dikhane ke liye

const UserHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search bar ke liye state
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    API.get('/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = '/';
  };

  // Search filter logic
  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* --- 1. MODERN NAVBAR --- */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '15px 8%', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 1000
      }}>
        <h2 style={{ margin: 0, color: '#e67e22', fontWeight: '800', fontSize: '28px', cursor: 'pointer' }} onClick={() => navigate('/home')}>
          🍔 Foodie<span style={{ color: '#2d3436' }}>App</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/cart')}
            style={{ 
              background: '#2ecc71', color: 'white', border: 'none', padding: '10px 20px', 
              borderRadius: '25px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
              transition: '0.3s', boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)'
            }}
          >
            🛒 Cart <span style={{ background: '#fff', color: '#2ecc71', borderRadius: '50%', padding: '2px 8px', fontSize: '12px' }}>{cart.length}</span>
          </button>

          <button 
            onClick={handleLogout} 
            style={{ 
              background: 'none', color: '#e74c3c', border: '1px solid #e74c3c', padding: '8px 18px', 
              borderRadius: '25px', cursor: 'pointer', fontWeight: '600', transition: '0.3s'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* --- 2. HERO SECTION (SEARCH) --- */}
      <div style={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', padding: '80px 20px', textAlign: 'center', color: 'white'
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '10px' }}>Hungry? You're in the right place.</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: '0.9' }}>Order from the best restaurants in your city</p>
        
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="Search for restaurants or cuisines..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '18px 25px', borderRadius: '30px', border: 'none',
              fontSize: '16px', outline: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>

      {/* --- 3. RESTAURANT GRID --- */}
      <div style={{ padding: '40px 8%' }}>
        <h3 style={{ fontSize: '24px', color: '#2d3436', marginBottom: '25px', borderLeft: '5px solid #e67e22', paddingLeft: '15px' }}>
          Popular Restaurants
        </h3>

        <div className="grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px'
        }}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(r => (
              <div 
                key={r._id} 
                className="card" 
                onClick={() => navigate(`/restaurant/${r._id}`)}
                style={{ 
                  cursor: 'pointer', background: '#fff', borderRadius: '15px', 
                  overflow: 'hidden', transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={r.image} alt={r.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', bottom: '10px', right: '10px', background: '#27ae60', 
                    color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold'
                  }}>
                    ★ 4.2
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#2d3436' }}>{r.name}</h3>
                  <p style={{ color: '#636e72', fontSize: '14px', lineHeight: '1.5', margin: '0 0 15px 0', height: '42px', overflow: 'hidden' }}>
                    {r.description}
                  </p>
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', color: '#b2bec3', fontSize: '12px' }}>
                    <span>🕒 30-40 mins</span>
                    <span style={{ color: '#e67e22', fontWeight: 'bold' }}>VIEW MENU →</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
              <h2 style={{ color: '#ccc' }}>No restaurants found...</h2>
            </div>
          )}
        </div>
      </div>

      {/* --- 4. FOOTER --- */}
      <footer style={{ textAlign: 'center', padding: '40px', background: '#2d3436', color: '#fff', marginTop: '50px' }}>
        <p style={{ margin: 0, opacity: 0.7 }}>© 2026 FoodieApp - Made for Excellence</p>
      </footer>
    </div>
  );
};

export default UserHome;