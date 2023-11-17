import React, { useState, useEffect } from 'react';
import { Button, Modal ,Container,Row,Col ,Table} from 'react-bootstrap';
const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/allusers');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      
      }
    };

    fetchUsers();
  }, []);
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGenerateReport = () => {

    console.log('Generating report for user:', selectedUser);
    
  };
  return (
    <div>
      <h2>User Details</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>UserID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.password}</td>
              <td>{user.userId}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Username:</strong> {selectedUser?.username}</p>
          <p><strong>Email:</strong> {selectedUser?.email}</p>
          <p><strong>Phone:</strong> {selectedUser?.phone}</p>
          <p><strong>Password:</strong> {selectedUser?.password}</p>
          <p><strong>UserID:</strong> {selectedUser?.userId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDetails;
