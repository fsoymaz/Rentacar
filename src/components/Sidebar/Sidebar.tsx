import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";
import navLinks from "./Navlink";
import { Col } from "react-bootstrap";

const Sidebar = () => {

  const [mobileOpenState, setMobileOpenState] = React.useState<boolean>(false);

  return (
    <>
      <div className={`${mobileOpenState ? 'mobileOpenBTNActive' : 'mobileOpenBTN'}`} style={{width: '3rem'}} onClick={() => { setMobileOpenState(prev => !prev) }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m10 17l5-5l-5-5z" /></svg>
      </div>
      <Col xs={12} sm={2} className={`${mobileOpenState ? 'sidebarActive' : 'sidebar'}`} style={{}}>
        <div className="sidebar__top">
          <img style={{ width: '60%' }} src="/logo/LogoBlu.png" alt="" />
        </div>

        <div className="sidebar__content">
          <div className="menu">
            <ul className="nav__list">
              {navLinks.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink onClick={() => { setMobileOpenState(prev => !prev) }}
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
      </Col>
    </>
  );
};

export default Sidebar;