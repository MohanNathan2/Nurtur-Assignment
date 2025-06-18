import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Topbar />
      <main  style={{ paddingTop: '60px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
