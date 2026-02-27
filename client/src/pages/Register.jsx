import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/');
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ background: '#28a745', color: 'white', padding: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;