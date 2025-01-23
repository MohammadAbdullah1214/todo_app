import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaTasks, FaUser } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar shadow-sm">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link className="nav-link d-flex align-items-center" to="/dashboard">
                            <FaTachometerAlt className="me-2" /> 
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link className="nav-link d-flex align-items-center" to="/tasklist/tasks/new">
                            <FaTasks className="me-2" /> 
                            <span>Task List</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to="/user-profile">
                            <FaUser className="me-2" /> 
                            <span>User Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
