import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiGrid, FiPieChart } from 'react-icons/fi'; // npm install react-icons

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? "nav-active" : "";

  return (
    <nav className="navbar">
      <div className="nav-logo">SmartTracker</div>
      <div className="nav-links">
        <Link to="/dashboard" className={isActive('/dashboard')}>
          <FiPieChart /> Dashboard
        </Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/applications" className={isActive('/applications')}>
          <FiGrid /> My Jobs
        </Link>
        <Link to="/applications/new" className="add-btn-nav">
          <FiPlus /> Add Job
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;