import React from 'react';

export const Loader = () => (
  <div className="flex-center" style={{ height: '200px' }}>
    <div className="spinner"></div>
    <p>Fetching your opportunities...</p>
  </div>
);

export const EmptyState = ({ message }) => (
  <div className="empty-state">
    <img 
      src="https://illustrations.popsy.co/gray/paper-plane.svg" 
      alt="Empty" 
      style={{ width: '200px', marginBottom: '20px' }} 
    />
    <h3>No applications found</h3>
    <p>{message || "Start your journey by adding your first job application."}</p>
  </div>
);