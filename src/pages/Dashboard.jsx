import { useApps } from '../context/ApplicationContext';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { fetchInitialMockData } from '../services/api';
import { Loader, EmptyState } from '../components/Feedback';

const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { applications, setApplications } = useApps();

  useEffect(() => {
    if (applications.length === 0) {
      setIsLoading(true);
      fetchInitialMockData().then(data => {
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) return <Loader />;

  const stats = [
    { label: 'Total Apps', value: applications.length, icon: <FiBriefcase />, color: 'blue' },
    { label: 'Interviews', value: applications.filter(app => app.status === 'Interviewing').length, icon: <FiCalendar />, color: 'orange' },
    { label: 'Offers', value: applications.filter(app => app.status === 'Offer').length, icon: <FiCheckCircle />, color: 'green' },
    { label: 'Rejections', value: applications.filter(app => app.status === 'Rejected').length, icon: <FiXCircle />, color: 'red' },
  ];

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Search Overview</h2>
      
      <div className="stats-container">
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card-mini ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h4>{stat.label}</h4>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-footer">
        <h3>Recent Activity</h3>
        <div className="recent-list">
          {applications.slice(-3).reverse().map(app => (
            <div key={app.id} className="recent-item">
              <span>{app.company}</span>
              <span className="recent-role">{app.role}</span>
              <span className={`status-small ${app.status.replace(/\s/g, '')}`}>{app.status}</span>
            </div>
          ))}
          {applications.length === 0 && <p className="empty-text">No applications tracked yet.</p>}
        </div>
        <Link to="/applications/new" className="primary-btn">Track New Job</Link>
      </div>
    </div>
  );
};

export default Dashboard;