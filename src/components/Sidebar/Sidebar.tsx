import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className='col'>
    <nav className={`sidebar  ${isSidebarClosed ? 'close' : ''}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="/logo/LogoBlu.png" alt="logo" />
          </span>
        </div>
        <i className={`bx ${isSidebarClosed ? 'bx-chevron-left' : 'bx-chevron-right'} toggle`} onClick={handleSidebarToggle}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <a href="/admin">
                <i className="bx bx-home-alt icons"></i>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="/admin/admincar">
                <i className="bx bx-car icons"></i>
                <span className="text nav-text">Add Car</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="/admin/addBrand">
                <i className="bx bx-tag icons"></i>
                <span className="text nav-text">Add Brand</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Sidebar;