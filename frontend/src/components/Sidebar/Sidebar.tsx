import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navLinks } from "./Navlink";

const Sidebar = () => {

  const [mobileOpenState, setMobileOpenState] = React.useState<boolean>(false);

  return (
    <>
      <div className={`${mobileOpenState ? 'mobileOpenBTNActive' : 'mobileOpenBTN'}`} style={{ width: '3rem' }} onClick={() => { setMobileOpenState(prev => !prev) }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m10 17l5-5l-5-5z" /></svg>
      </div>
      <Col xs={12} sm={2} className={`${mobileOpenState ? 'sidebarActive' : 'sidebar'}`} style={{}}>
        <div className="sidebar__top">
          <span style={{ fontSize: '1.5rem', fontWeight: '800', userSelect: 'none', cursor: 'pointer' }}>Rent</span>
          <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: '800', userSelect: 'none', cursor: 'pointer' }}>A</span>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', userSelect: 'none', cursor: 'pointer' }}>Car</span>
        </div>

        <div className="sidebar__content">
          <div className="menu">
            <ul className="nav__list">
              {navLinks.map((item, index) => (
                <NavLink
                  key={index}
                  onClick={() => { setMobileOpenState(prev => !prev) }}
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__item nav__active nav__link" : "nav__item nav__link"
                  }
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.display}</span>
                </NavLink>
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
      </Col>
    </>
  );
};

export default Sidebar;