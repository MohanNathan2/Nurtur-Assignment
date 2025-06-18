import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#f1f1f1', padding: '10px 20px', textAlign: 'center' }}>
      <small>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
