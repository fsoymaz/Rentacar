// SignedOut.tsx
import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faRedo } from '@fortawesome/free-solid-svg-icons'; // faRedo ikonu şifre sıfırlama için kullanılabilir.
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SignedOut({ signIn }: { signIn: () => void }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.auth);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = 'white';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };



  return (
    <Menu.Item>
      {isAuthenticated.id === 0 && (
        <>
          <Button
            onClick={handleLoginClick}
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="transparent-button"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Giriş Yap
          </Button>
          <Button
            type="button"
            onClick={handleRegisterClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="transparent-button"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Kayıt Ol
          </Button>
        </>
      )}
    </Menu.Item>
  );
}
