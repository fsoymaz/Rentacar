import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";
import navLinks from "./Navlink";

const Sidebar = () => {
  return (
    <div className="sidebar col-2">
      <div className="sidebar__top">
        <img style={{ width: '60%' }} src="/logo/LogoBlu.png" alt="" />
      </div>

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <Link to="/">
            <span>
              <i className="fas fa-sign-out-alt"></i> Logout
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;