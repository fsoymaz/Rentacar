// Header.js
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
  backgroundImage: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  scrollTo?: string;
}

function Header({ backgroundImage, title, description, buttonText, onButtonClick, scrollTo }: HeaderProps) {
  const shouldShowArrow = scrollTo !== undefined;

  const scrollToContent = () => {
    const contentDiv = document.getElementById(scrollTo || '');
    if (contentDiv) {
      const contentTop = contentDiv.offsetTop;
      window.scrollTo({
        top: contentTop,
      });
    }
  };

  return (
    <div >
      <img 
        src={backgroundImage}
        alt=""
        style={{ width: '100%'}}
      />
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <p className="header-description">{description}</p>
        {shouldShowArrow && (
          <div className="header-arrow" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} size="2x" />
          </div>
        )}
        {buttonText && onButtonClick && (
          <button className="header-button" onClick={onButtonClick}>{buttonText}</button>
        )}
      </div>
    </div>
  );
}

export default Header;
