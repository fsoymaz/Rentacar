import { Dropdown, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../store/user/userSlice';
import { logoutRental } from '../../store/rental/rentalSlice';

export default function SignedIn({ }: {}) {
  const isAuthenticated = useSelector((state: any) => state.auth);
  const username = useSelector((state: any) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    dispatch(logoutRental());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      {isAuthenticated ? (
        <Dropdown  text={username} pointing className='link item profile px-3'>
          <Dropdown.Menu >
            <Dropdown.Item className='bg-white'  onClick={() => { navigate('/profile'); }}>
              <Icon name='user' />
              <strong>Hesabım</strong>
            </Dropdown.Item >
            {isAuthenticated.role === 'ADMIN' &&
              <Dropdown.Item className='bg-white' onClick={() => { navigate('/admin'); }}>
                <Icon name='user' />
                <strong>Admin Panel</strong>
              </Dropdown.Item>
            }
            <Dropdown.Item className='bg-white' onClick={() => {navigate('/userRentals');}}>
              <Icon name='money' />
              <strong>Kiralama</strong>
            </Dropdown.Item>
            <Dropdown.Item className='bg-white' onClick={handleLogout}>
              <Icon name='sign out' />
              <strong>Çıkış yap</strong>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
          <Link to='/login'>Giriş yap</Link>
        )}
    </>
  );
}
