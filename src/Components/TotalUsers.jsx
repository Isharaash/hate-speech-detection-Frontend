import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa'; // Import FaUsers icon
import './styles.css'; // Import the CSS file
function TotalUsers() {
    const [totalUsers, setTotalUsers] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Function to fetch total users
      const fetchTotalUsers = async () => {
        try {
          // Make a GET request to your API endpoint
          const response = await axios.get('https://hate-speech-detection-backend-app.onrender.com/api/admin/total_users', { withCredentials: true });
          
          // If successful, update the total users state
          setTotalUsers(response.data.total_users);
        } catch (error) {
          // If there's an error, set the error state
          setError(error.response ? error.response.data.error : 'An unexpected error occurred');
        }
      };
  
      // Call the fetchTotalUsers function
      fetchTotalUsers();
    }, []); // Empty dependency array to run effect only once
  
    return (
      <div className="total-users-container"> {/* Apply container class */}
        <FaUsers size={60} /> {/* Add the FaUsers icon */}
        {totalUsers !== null && <p>Total Users: <br/>{totalUsers}</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }
  
  export default TotalUsers;