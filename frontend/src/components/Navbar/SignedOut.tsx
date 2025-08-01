// SignedOut.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
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
    <>
      {isAuthenticated.id === 0 && (
        <>
          <Button
            onClick={handleLoginClick}
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variant="outline-primary"
            className="me-2"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
            Giriş Yap
          </Button>
          <Button
            type="button"
            onClick={handleRegisterClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variant="primary"
          >
            <FontAwesomeIcon icon={faUserPlus} className="me-1" />
            Kayıt Ol
          </Button>
        </>
      )}
    </>
  );
}
