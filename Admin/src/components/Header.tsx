import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Generate breadcrumbs based on current path
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(path => path);
    
    if (paths.length === 0) {
      return [{ name: 'Dashboard', path: '/dashboard' }];
    }
    
    return paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      let name = path.charAt(0).toUpperCase() + path.slice(1);
      
      // Handle special cases
      if (path === 'dashboard') name = 'Dashboard';
      if (path === 'routes' && paths.length === 1) name = 'Routes';
      if (path === 'routes' && paths.length > 1) name = 'Routes';
      if (path === 'new' && paths[index - 1] === 'routes') name = 'New Route';
      if (path === 'edit' && paths[index - 1] === 'routes') name = 'Edit Route';
      
      return { name, path: url };
    });
  };
  
  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-white border-bottom">
      <div className="container-fluid">
        <div className="row p-3">
          <div className="col d-flex align-items-center">
            {/* Mobile menu toggle */}
            <button 
              className="btn btn-light d-lg-none me-3"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb" className="d-none d-md-block">
              <ol className="breadcrumb mb-0">
                {breadcrumbs.map((crumb, index) => (
                  <li 
                    key={index} 
                    className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active fw-semibold' : ''}`}
                  >
                    {index === breadcrumbs.length - 1 ? (
                      crumb.name
                    ) : (
                      <a 
                        href="#" 
                        className="text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(crumb.path);
                        }}
                      >
                        {crumb.name}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            
            {/* Page title for mobile */}
            <div className="d-md-none">
              <h5 className="mb-0">{breadcrumbs[breadcrumbs.length - 1]?.name || 'Dashboard'}</h5>
            </div>
          </div>
          
          <div className="col-auto d-flex align-items-center">
            {/* Search */}
            <div className="position-relative me-3 d-none d-md-block">
              <input 
                type="text" 
                className="form-control ps-4" 
                placeholder="Search..." 
                style={{ width: '200px' }}
              />
              <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
            </div>
            
            {/* Notifications */}
            <div className="dropdown me-3">
              <button 
                className="btn btn-light position-relative"
                data-bs-toggle="dropdown"
              >
                <Bell size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  2
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><h6 className="dropdown-header">Notifications</h6></li>
                <li><a className="dropdown-item" href="#">New route added</a></li>
                <li><a className="dropdown-item" href="#">Route status changed</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">View all notifications</a></li>
              </ul>
            </div>
            
            {/* User menu */}
            <div className="dropdown">
              <button 
                className="btn btn-light d-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '30px', height: '30px' }}>
                  <span className="text-white fw-bold">{user?.username?.charAt(0) || 'A'}</span>
                </div>
                <span className="d-none d-md-inline">{user?.username || 'Admin'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={() => navigate('/login')}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;