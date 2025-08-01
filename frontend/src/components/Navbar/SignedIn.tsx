import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faMoneyBill, faCog } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../store/user/userSlice';
import { logoutRental } from '../../store/rental/rentalSlice';
import { logoutFilter } from '../../store/filter/filterSlice';

export default function SignedIn({ }: {}) {
  const isAuthenticated = useSelector((state: any) => state.auth);
  const username = useSelector((state: any) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    dispatch(logoutRental());
    dispatch(logoutFilter());
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    localStorage.removeItem('rental');
    localStorage.removeItem('filter');
    navigate('/');
  };

  return (
    <>
      {isAuthenticated ? (
        <Dropdown className="profile">
          <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-decoration-none text-dark">
            <FontAwesomeIcon icon={faUser} className="me-1" />
            {username}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { navigate('/profile'); }}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <strong>Hesabım</strong>
            </Dropdown.Item>
            {isAuthenticated.role === 'ADMIN' &&
              <Dropdown.Item onClick={() => { navigate('/admin'); }}>
                <FontAwesomeIcon icon={faCog} className="me-2" />
                <strong>Admin Panel</strong>
              </Dropdown.Item>
            }
            <Dropdown.Item onClick={() => {navigate('/userRentals');}}>
              <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
              <strong>Kiralama</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              <strong>Çıkış yap</strong>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
          <Link to='/login' className="btn btn-outline-primary">Giriş yap</Link>
        )}
    </>
  );
}
