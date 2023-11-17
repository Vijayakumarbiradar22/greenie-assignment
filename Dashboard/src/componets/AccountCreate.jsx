// AccountCreate.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Container,Row,Col } from 'react-bootstrap';
const AccountCreate = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const generateUserId = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let generatedUserId = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedUserId += characters.charAt(randomIndex);
    }

    setUserId(generatedUserId);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Generate a unique 8-character user ID
    generateUserId();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
          userId
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const responseData = await response.json();

      // Update the state with the actual user ID from the response
      setUserId(responseData.userId);

      // Handle successful registration (optional)
      console.log('User registered successfully with ID:', responseData.userId);
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
      <Col md={2}/>
        <Col md={10}>
          <div className="d-flex flex-column align-items-center">
            <h2 className="mb-4">Create an Account</h2>
            <form onSubmit={handleRegistration}>
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
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                Register
              </button>
            </form>
            {userId && (
              <div className="mt-3">
                <p>Generated User ID: {userId}</p>
              </div>
            )}
          </div>
        </Col>
<Col/>
<Col/>
<Col/>
<Col/>
<Col/>
<Col/>
<Col/>
<Col/>
<Col/>

      </Row>
    </Container>
  );
};

export default AccountCreate;
