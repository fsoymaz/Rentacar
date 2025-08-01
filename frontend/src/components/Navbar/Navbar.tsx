import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Offcanvas, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCar, 
  faPhone, 
  faInfoCircle, 
  faBars,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import './Navbar.scss';

const CustomNavbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store: any) => store.auth.isAuthenticated);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signIn = () => {
    dispatch(isAuthenticated(true));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLinkClick = () => {
    setShow(false);
    window.scrollTo(0, 0);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const carCategories = [
    { path: '/cars', label: 'Tüm Araçlar', icon: faCar },
    { path: '/cars/category?category=ECONOMY', label: 'Ekonomik Araçlar' },
    { path: '/cars/category?category=LUXURY', label: 'Lüks Araçlar' },
    { path: '/cars/category?category=COMFORT', label: 'Konfor Araçlar' },
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
        fixed="top"
        variant="light"
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="brand-logo" onClick={handleLinkClick}>
            <div className="logo-container">
              <div className="logo-icon">
                <FontAwesomeIcon icon={faCar} />
              </div>
              <div className="logo-text">
                <span className="brand-name">Rent</span>
                <span className="brand-accent">A</span>
                <span className="brand-name">Car</span>
              </div>
            </div>
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <Nav className="mx-auto d-none d-lg-flex desktop-nav">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-custom ${isActiveLink('/') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Ana Sayfa
            </Nav.Link>
            
            {/* Cars Dropdown */}
            <div className="nav-dropdown">
              <Nav.Link 
                className={`nav-link-custom dropdown-toggle ${location.pathname.includes('/cars') ? 'active' : ''}`}
              >
                Araçlar
                <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
              </Nav.Link>
              <div className="dropdown-menu-custom">
                {carCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="dropdown-item-custom"
                    onClick={handleLinkClick}
                  >
                    {category.icon && <FontAwesomeIcon icon={category.icon} className="me-2" />}
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`nav-link-custom ${isActiveLink('/about') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
              Hakkımızda
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className={`nav-link-custom ${isActiveLink('/contact') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <FontAwesomeIcon icon={faPhone} className="me-1" />
              İletişim
            </Nav.Link>
          </Nav>

          {/* Auth Section */}
          <div className="d-none d-lg-flex auth-section">
            {isAuthenticated ? <SignedIn /> : <SignedOut signIn={signIn} />}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle d-lg-none"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="end"
        className="mobile-offcanvas"
      >
        <Offcanvas.Header closeButton className="mobile-header">
          <Offcanvas.Title>
            <div className="mobile-logo">
              <span className="brand-name">Rent</span>
              <span className="brand-accent">A</span>
              <span className="brand-name">Car</span>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="mobile-body">
          <Nav className="flex-column mobile-nav">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`mobile-nav-link ${isActiveLink('/') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Ana Sayfa
            </Nav.Link>
            
            <div className="mobile-nav-section">
              <div className="mobile-nav-title">Araçlar</div>
              {carCategories.map((category, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={category.path}
                  className="mobile-nav-link sub-link"
                  onClick={handleLinkClick}
                >
                  {category.icon && <FontAwesomeIcon icon={category.icon} className="me-2" />}
                  {category.label}
                </Nav.Link>
              ))}
            </div>

            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`mobile-nav-link ${isActiveLink('/about') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
              Hakkımızda
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className={`mobile-nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              İletişim
            </Nav.Link>
          </Nav>

          {/* Mobile Auth Section */}
          <div className="mobile-auth-section mt-4">
            {isAuthenticated ? <SignedIn /> : <SignedOut signIn={signIn} />}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;