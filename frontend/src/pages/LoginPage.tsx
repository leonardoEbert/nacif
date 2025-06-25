import React from 'react';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ minWidth: 350 }}>
        <h1 className="text-center mb-4">Login</h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;