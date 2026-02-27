import { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRest, setSelectedRest] = useState(null); 
  const [restForm, setRestForm] = useState({ name: '', image: '', description: '' });
  const [foodForm, setFoodForm] = useState({ name: '', image: '', price: '' });
  const [menuItems, setMenuItems] = useState([]);

  const fetchRestaurants = async () => {
    const res = await API.get('/restaurants');
    setRestaurants(res.data);
  };

  useEffect(() => { fetchRestaurants(); }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out from Admin Panel");
    window.location.href = '/'; 
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    await API.post('/restaurants', restForm);
    fetchRestaurants();
    setRestForm({ name: '', image: '', description: '' });
    alert("Restaurant Added!");
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    await API.post(`/restaurants/${selectedRest._id}/food`, foodForm);
    const res = await API.get(`/restaurants/${selectedRest._id}/food`); 
    setMenuItems(res.data);
    setFoodForm({ name: '', image: '', price: '' });
    alert("Food Item Added!");
  };

  const handleSelectRestaurant = async (restaurant) => {
    setSelectedRest(restaurant);
    const res = await API.get(`/restaurants/${restaurant._id}/food`);
    setMenuItems(res.data);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* --- TOP NAVBAR --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#2c3e50', color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
        <h2 style={{ margin: 0, letterSpacing: '1px' }}>🛠️ Admin<span style={{ color: '#3498db' }}>Portal</span></h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>Welcome, Administrator</span>
          <button 
            onClick={handleLogout} 
            style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ display: 'flex', gap: '30px', padding: '30px' }}>
        
        {/* --- LEFT COLUMN: RESTAURANT MANAGEMENT --- */}
        <div style={{ flex: '1' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            <h3 style={{ marginTop: 0, color: '#34495e', borderBottom: '2px solid #3498db', display: 'inline-block', paddingBottom: '5px' }}>
              Add New Restaurant
            </h3>
            <form onSubmit={handleAddRestaurant} style={{ marginTop: '15px' }}>
              <input type="text" placeholder="Restaurant Name" value={restForm.name} required onChange={(e) => setRestForm({...restForm, name: e.target.value})} style={{ width: '100%', marginBottom: '12px', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
              <input type="text" placeholder="Image URL (Logo)" value={restForm.image} required onChange={(e) => setRestForm({...restForm, image: e.target.value})} style={{ width: '100%', marginBottom: '12px', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
              <textarea placeholder="Short Description" value={restForm.description} required onChange={(e) => setRestForm({...restForm, description: e.target.value})} style={{ width: '100%', marginBottom: '12px', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '80px', boxSizing: 'border-box' }} />
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                🚀 Save Restaurant
              </button>
            </form>
          </div>

          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, color: '#34495e' }}>Existing Restaurants</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {restaurants.map(r => (
                <div key={r._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f0f0f0', backgroundColor: selectedRest?._id === r._id ? '#ebf5fb' : 'transparent', borderRadius: '8px', marginBottom: '5px' }}>
                  <span style={{ fontWeight: '600' }}>{r.name}</span>
                  <button onClick={() => handleSelectRestaurant(r)} style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                    Edit Menu
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MENU MANAGEMENT --- */}
        <div style={{ flex: '1.2' }}>
          {selectedRest ? (
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '5px solid #e67e22' }}>
              <h3 style={{ marginTop: 0, color: '#e67e22' }}>🍱 Manage Menu: {selectedRest.name}</h3>
              
              <form onSubmit={handleAddFood} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#fdf2e9', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
                <input type="text" value={foodForm.name} placeholder="Food Name" required onChange={(e) => setFoodForm({...foodForm, name: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                <input type="number" value={foodForm.price} placeholder="Price (₹)" required onChange={(e) => setFoodForm({...foodForm, price: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                <input type="text" value={foodForm.image} placeholder="Image URL" required onChange={(e) => setFoodForm({...foodForm, image: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  + Add Item to Menu
                </button>
              </form>

              <h4>Current Live Menu</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
                {menuItems.map(item => (
                  <div key={item._id} style={{ border: '1px solid #eee', borderRadius: '10px', textAlign: 'center', padding: '10px', transition: '0.3s', backgroundColor: '#fff' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                    <p style={{ margin: '8px 0 2px 0', fontSize: '14px', fontWeight: '600' }}>{item.name}</p>
                    <p style={{ fontWeight: 'bold', color: '#27ae60', margin: 0 }}>₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '12px', border: '2px dashed #ccc', color: '#999' }}>
              <h3>Select a restaurant from the left to manage its menu</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;