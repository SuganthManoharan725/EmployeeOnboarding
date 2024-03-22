import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  

  const navigate = useNavigate();

  const handleLogin = () => {

    navigate(`/Home?role=${role}`);
    
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage