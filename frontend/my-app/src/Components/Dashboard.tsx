import React, { useEffect, useState } from 'react';
import { getTaskCounts } from '../Services/taskService';
import { useAuth } from '../Hooks/useAuth';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaCheckCircle, FaHourglassHalf, FaClipboardList } from 'react-icons/fa';

interface TaskCounts {
    completed: number;
    inProgress: number;
    pending: number;
}

const Dashboard: React.FC = () => {
    const { isAuthenticated, userId, username, role, logout } = useAuth();
    const navigate = useNavigate();
    const [taskCounts, setTaskCounts] = useState<TaskCounts>({
        completed: 0,
        inProgress: 0,
        pending: 0,
    });

    useEffect(() => {
        const fetchTaskCounts = async () => {
            if (!userId) return;
            try {
                const counts = await getTaskCounts(userId);
                setTaskCounts(counts);
            } catch (error) {
                console.error('Error fetching task counts:', error);
            }
        };

        if (isAuthenticated && userId) {
            fetchTaskCounts();
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, userId, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
                    {/* Welcome Section */}
                    <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3">
                        <div>
                            <h2>Welcome, {username || 'User'} 👋</h2>
                            <p className="text-muted mb-0">{role || 'Role'} | Dashboard Overview</p>
                        </div>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    {/* Task Cards Section */}
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 bg-light">
                                <div className="card-body d-flex align-items-center">
                                    <FaCheckCircle className="text-success fs-1 me-3" />
                                    <div>
                                        <h5 className="card-title">Completed Tasks</h5>
                                        <p className="card-text fs-4 fw-bold">{taskCounts.completed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 bg-light">
                                <div className="card-body d-flex align-items-center">
                                    <FaHourglassHalf className="text-warning fs-1 me-3" />
                                    <div>
                                        <h5 className="card-title">In Progress Tasks</h5>
                                        <p className="card-text fs-4 fw-bold">{taskCounts.inProgress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 bg-light">
                                <div className="card-body d-flex align-items-center">
                                    <FaClipboardList className="text-danger fs-1 me-3" />
                                    <div>
                                        <h5 className="card-title">Pending Tasks</h5>
                                        <p className="card-text fs-4 fw-bold">{taskCounts.pending}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h4>Your Task Summary</h4>
                                    <p>
                                        You have a total of{' '}
                                        <span className="fw-bold">
                                            {taskCounts.completed + taskCounts.inProgress + taskCounts.pending}
                                        </span>{' '}
                                        tasks.
                                    </p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <FaCheckCircle className="text-success me-2" />
                                            {taskCounts.completed} tasks completed
                                        </li>
                                        <li className="list-group-item">
                                            <FaHourglassHalf className="text-warning me-2" />
                                            {taskCounts.inProgress} tasks in progress
                                        </li>
                                        <li className="list-group-item">
                                            <FaClipboardList className="text-danger me-2" />
                                            {taskCounts.pending} tasks pending
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
