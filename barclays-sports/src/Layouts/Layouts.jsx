import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> {/* Add the Footer here */}
    </div>
  );
};

export default Layout;