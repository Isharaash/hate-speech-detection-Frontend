import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Importing FiLogOut icon
import './styles.css'; // Import CSS file

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Show confirmation alert before logging out
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) {
      return; // If the user cancels the logout, do nothing
    }

    try {
      // Perform logout logic here, such as clearing session/local storage
      await fetch('http://localhost:5000/api/login', { method: 'POST' });
      // Clear any user-related data from local storage if necessary
      // localStorage.removeItem('user'); // If you're using local storage
      // Navigate to the login page after logout
      navigate('/loginPage');
      // Show alert after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure, possibly by displaying an error message
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut className="icon" /> {/* Using FiLogOut icon */}
        Logout
      </button>
      {/* You can optionally display a loading spinner or message here */}
    </div>
  );
};

export default LogoutPage;
