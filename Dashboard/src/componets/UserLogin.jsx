import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful. User ID:', data.userId);
        
        navigate('/details')
      } else {
        console.error('Login failed:', response.status);
       
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md='6'/>

        <Col md='6' className="d-flex justify-content-center"> {/* Add these classes */}
          <div className="align-items-center">
            <h2 className="mb-4">User Login</h2>
            <form onSubmit={handleLogin} className="w-50 align-items-center">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
            <p className="mt-3">
              Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
          </div>
        </Col>
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />

        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
      </Row>
    </Container>
  );
};

export default UserLogin;
