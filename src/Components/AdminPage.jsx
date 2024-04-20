import React from 'react'
import TotalUsers from './TotalUsers'
import { useLocation } from 'react-router-dom';

import './styles.css'; 
import AdminLogout from './AdminLogout';


const AdminPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');

  return (
    <div className="user-page">
    <div className="header">
        <h2>Welcome, {firstName} {lastName}!</h2>

<AdminLogout className="logout-button2" />
<TotalUsers/>
      </div>


      {/* Your admin page content goes here */}
    </div>
  );
};

export default AdminPage;