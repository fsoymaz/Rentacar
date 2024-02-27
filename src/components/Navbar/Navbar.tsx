import React, { useContext, useEffect, useState } from 'react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { Form, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

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


  const signIn = () => {
    dispatch(isAuthenticated(true))
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Navbar expand="sm" className=" mb-3" id="MainNavbar" sticky="top">
      <Container fluid className="Navbar">
        <Navbar.Brand href="/">
        <span style={{fontSize : '1.5rem' , fontWeight : '800', userSelect: 'none', cursor: 'pointer'}}>Rent</span>
        <span style={{color : 'red', fontSize : '1.5rem' , fontWeight : '800', userSelect: 'none', cursor: 'pointer'}}>A</span>
        <span style={{fontSize : '1.5rem' , fontWeight : '800', userSelect: 'none', cursor: 'pointer'}}>Car</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 Nav">
              <div id="firstDiv">
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
              </div>
              <Nav.Link>
                {isAuthenticated ? <SignedIn /> : <SignedOut signIn={signIn} />}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    // <Navbar expand='lg' className='Navbar'>
    //   <Container className="NavbarContainer">
    //     <Navbar.Brand as={Link} to="/">
    //       <img
    //         src={logo}
    //         alt="logo"
    //         className="logo"
    //         style={{width: '60%'}}
    //         onClick={handleLinkClick}
    //         onMouseEnter={handleMouseEnter}
    //         onMouseLeave={handleMouseLeave}
    //       />
    //     </Navbar.Brand>
    //     <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}
    //           aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
    //           placement="end">
    //       <Offcanvas.Header closeButton>
    //         <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
    //           Title
    //         </Offcanvas.Title>
    //       </Offcanvas.Header>
    //       <Offcanvas.Body>
    //         <Navbar.Collapse id="responsive-navbar-nav">
    //           <Nav className="Nav">
    //             <Nav.Link as={Link} to="/about" onClick={handleLinkClick}>
    //               Hakkımızda
    //             </Nav.Link>
    //             <NavDropdown  title="Araçlar">
    //               <NavDropdown.Item as={Link} to="/cars" onClick={handleLinkClick}>
    //                 Tüm Kiralık Araçlar
    //               </NavDropdown.Item>
    //               <NavDropdown.Item as={Link} to="/cars/category?category=ECONOMY" onClick={handleLinkClick}>
    //                 Ekonomik Araçlar
    //               </NavDropdown.Item>
    //               <NavDropdown.Item as={Link} to="/cars/category?category=LUXURY" onClick={handleLinkClick}>
    //                 Lüks Araçlar
    //               </NavDropdown.Item>
    //               <NavDropdown.Item as={Link} to="/cars/category?category=COMFORT" onClick={handleLinkClick}>
    //                 Konfor Araçlar
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //             <Nav.Link as={Link} to="/services" onClick={handleLinkClick}>
    //               Hizmetler
    //             </Nav.Link>
    //             <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>
    //               İletişim
    //             </Nav.Link>
    //           </Nav>
    //           <Nav >
    //             <Nav.Link>
    //               {isAuthenticated ? <SignedIn /> : <SignedOut signIn={signIn} />}
    //             </Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Offcanvas.Body>
    //     </Navbar.Offcanvas>
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    //   </Container>
    // </Navbar>
  );
};

export default CustomNavbar;