import React, { useState } from 'react';
import './ManageAccount.css';
import AppBar from '../components/AppBar.js';

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    age: false,
    dob: false,
    email: false,
    phone: false,
    address: false,
  });

  const [userInfo, setUserInfo] = useState({
    name: 'Yassine',
    age: 28,
    dob: '1995-05-15',
    email: 'y.ibrok@aui.ma',
    phone: '555-123-4567',
    address: '123 Main St, City, Country',
  });

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const renderField = (field, type = 'text') => {
    return isEditing[field] ? (
      <input
        type={type}
        value={userInfo[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onBlur={() => handleEditClick(field)}
      />
    ) : (
      <>
        {userInfo[field]}{' '}
        <span className="edit-icon" onClick={() => handleEditClick(field)}>
          🖉
        </span>
      </>
    );
  };

  return (
    <>
      <AppBar username={'yassine'} />
      <div className="client-profile">
        <h2>Manage Personal Information</h2>
        <div className="profile-container">
          {Object.keys(userInfo).map((key) => (
            <div className="profile-field" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              {renderField(key)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientProfile;
