import { Dropdown, Icon, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../store/user/userSlice';
import { resetRentalState } from '../../store/rental/rentalSlice';

export default function SignedIn({  }: {}) {
  const isAuthenticated = useSelector((state: any) => state.auth);
  const email = useSelector((state: any) => state.auth.email);
  const username = useSelector((state: any) => state.auth.username);
  const dispatch = useDispatch();
  const navigate =useNavigate();


  const handleLogout = () => {
    dispatch(logoutSuccess());
    dispatch(resetRentalState());
    // Diğer çıkış işlemleri buraya eklenebilir, örneğin token'ı silme vb.
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      {isAuthenticated ? (
          <Dropdown text={username} pointing className='link item profile'>
            <Dropdown.Menu >
                  <Dropdown.Item onClick={()=>{  navigate('/profile');}}>
                <Icon name='user' />
                <strong>Hesabım</strong>
              </Dropdown.Item >
              <Dropdown.Item  onClick={handleLogout}>
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
