import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Import a solid icon
import './Footer.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const CustomFooter = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <Link
          to="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text"
        >
          Your Website
        </Link>
        <div className="footer-content">
          <a
            href="https://www.instagram.com/yourinstagram"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-text"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://twitter.com/yourtwitter"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-text"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CustomFooter;
