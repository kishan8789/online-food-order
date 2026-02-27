import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await API.post('/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      
      // Role ke basis par redirect
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      alert("Invalid Credentials or Role");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      {localStorage.getItem('token') && (
        <button 
          onClick={handleLogout} 
          style={{ marginBottom: '20px', background: '#dc3545', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Logout Current Session
        </button>
      )}

      <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* 2. Role Selection Dropdown */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Login As:</label>
            <select 
              value={formData.role} 
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="user">User / Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <input 
            type="email" 
            placeholder="Email" 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />

          <button type="submit" style={{ background: '#007bff', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '15px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;