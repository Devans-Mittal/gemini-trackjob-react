import React from 'react';
import { FiCalendar, FiDollarSign, FiEdit2, FiTrash2, FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete, onBookmark }) => {
  return (
    <div className="job-card">
      <button 
        className={`action-btn bookmark-btn ${job.bookmarked ? 'active' : ''}`}
        onClick={() => onBookmark(job.id)}
      >
        <FiBookmark fill={job.bookmarked ? "currentColor" : "none"} />
      </button>

      <h3>{job.role}</h3>
      <p><strong>{job.company}</strong> • {job.location}</p>
      
      <span className={`status-badge status-${job.status.toLowerCase()}`}>
        {job.status}
      </span>

      <div className="job-details">
        <div className="detail-item"><FiCalendar /> {job.appliedDate}</div>
        <div className="detail-item"><FiDollarSign /> ${job.salary}</div>
      </div>

      <div className="card-actions">
        <Link to={`/applications/${job.id}`} className="action-btn edit-btn">
          <FiEdit2 />
        </Link>
        <button onClick={() => onDelete(job.id)} className="action-btn delete-btn">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default JobCard;