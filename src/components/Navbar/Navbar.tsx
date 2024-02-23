import React, { useContext, useEffect, useState } from 'react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';

const CustomNavbar = () => {
  const [logo, setLogo] = useState('/logo/LOGOROSSO.png');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store: any) => store.auth.isAuthenticated);
  const handleMouseEnter = () => {
    setLogo('/logo/LOGOBLU.png'); // Mouse üzerindeyken gösterilecek logo
  };

  const handleMouseLeave = () => {
    setLogo('/logo/LOGOROSSO.png'); // Mouse üzerinde değilken gösterilecek logo
  };


  const signOut = () => {
    dispatch(isAuthenticated(false))
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  
  };

  const signIn = () => {
    dispatch(isAuthenticated(true))
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Navbar expand='lg' className='Navbar'>
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={handleLinkClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="Nav">
          <Nav.Link as={Link} to="/about" onClick={handleLinkClick}>
            Hakkımızda
          </Nav.Link>
          <NavDropdown title="Araçlar">
            <NavDropdown.Item as={Link} to="/cars" onClick={handleLinkClick}>
              Tüm Kiralık Araçlar
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cars/category?category=ECONOMY" onClick={handleLinkClick}>
              Ekonomik Araçlar
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cars/category?category=LUXURY" onClick={handleLinkClick}>
              Lüks Araçlar
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cars/category?category=COMFORT" onClick={handleLinkClick}>
              Konfor Araçlar
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/services" onClick={handleLinkClick}>
            Hizmetler
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>
            İletişim
          </Nav.Link>
        </Nav>
        <Nav >
          <Nav.Link>
            {isAuthenticated ? <SignedIn /> : <SignedOut signIn={signIn} />}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;