import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import './component.css';

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src="/logo.png" alt="Logo" className="topbar-logo" />
      </div>

      <div className="topbar-right">
        <div
          className="topbar-user"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <img src="/user.png" alt="User" className="topbar-avatar" />
          {isDropdownOpen && (
            <div className="topbar-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <div className="hamburger-icon" onClick={() => setMobileMenuVisible(!isMobileMenuVisible)}>
          <MenuOutlined />
        </div>
      </div>

      {isMobileMenuVisible && (
        <div className="mobile-menu-dropdown">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Topbar;
