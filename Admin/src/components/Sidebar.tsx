import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Layers,
  LayoutDashboard,
  Route,
  Settings,
  Users,
  LogOut,
  User,
  Truck,
  Calendar,
  ClipboardList,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary text-white' : 'text-white-50'}`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar h-100 bg-dark text-white position-fixed d-flex flex-column d-lg-block`}
        style={{
          width: '250px',
          zIndex: 1050,
          top: 0,
          left: 0,
          height: '100vh',
          overflowY: 'auto',
          transform: isOpen ? 'translateX(0)' : 'translateX(-250px)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center p-3 border-bottom border-secondary">
          <Layers size={24} className="text-primary me-2" />
          <h5 className="mb-0">Matatau Connset</h5>
        </div>

        {/* User info */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <div
              className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
            >
              <span className="text-white fw-bold">{user?.username?.charAt(0) || 'A'}</span>
            </div>
            <div className="ms-3">
              <div className="fw-semibold">{user?.username || 'Admin'}</div>
              <div className="small text-muted">{user?.email || 'admin@example.com'}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex-grow-1">
          <p className="text-uppercase small text-muted mb-2">Main</p>
          <ul className="nav flex-column gap-1">
            <li className="nav-item">
              <NavLink to="/dashboard" className={navLinkClass}>
                <LayoutDashboard size={18} className="me-2" />
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/AdminRoutes" className={navLinkClass}>
                <Route size={18} className="me-2" />
                Routes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/users" className={navLinkClass}>
                <Users size={18} className="me-2" />
                Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/drivers" className={navLinkClass}>
                <User size={18} className="me-2" />
                Drivers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/vehicles" className={navLinkClass}>
                <Truck size={18} className="me-2" />
                Vehicles
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/schedules" className={navLinkClass}>
                <Calendar size={18} className="me-2" />
                Schedules
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/bookings" className={navLinkClass}>
                <ClipboardList size={18} className="me-2" />
                Bookings
              </NavLink>
            </li>
          </ul>

          <p className="text-uppercase small text-muted mb-2 mt-4">Settings</p>
          <ul className="nav flex-column gap-1">
            <li className="nav-item">
              <NavLink to="/settings" className={navLinkClass}>
                <Settings size={18} className="me-2" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-top border-secondary mt-auto">
          <button
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            onClick={logout}
          >
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
