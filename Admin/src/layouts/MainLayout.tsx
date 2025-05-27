import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const SIDEBAR_WIDTH = 250;

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992); // open by default on desktop

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on window resize if below lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div
        className="flex-grow-1 d-flex flex-column vh-100 overflow-auto"
        style={{
          marginLeft: sidebarOpen ? SIDEBAR_WIDTH : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-grow-1 bg-light p-3 p-md-4">
          <div className="container-fluid px-0">
            <Outlet />
          </div>
        </main>

        <footer className="py-3 bg-white border-top">
          <div className="container-fluid">
            <div className="small text-muted text-center">
              © {new Date().getFullYear()} Mat Connet Admin
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
