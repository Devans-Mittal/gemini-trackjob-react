import React, { useState, useEffect, useMemo } from 'react';
import { useApps } from '../context/ApplicationContext';
import { useDebounce } from '../hooks/useDebounce';
import { fetchInitialMockData } from '../services/api';
import { Loader, EmptyState } from '../components/Feedback';
import JobCard from '../components/JobCard';

const Applications = () => {
  const { applications, deleteApp, toggleBookmark } = useApps();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [loading, setLoading] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredApps = useMemo(() => {
    let result = applications.filter(app => {
      const searchLower = debouncedSearch.toLowerCase();
      return app.company.toLowerCase().includes(searchLower) || 
            app.role.toLowerCase().includes(searchLower);
    });

    if (statusFilter === "Bookmarked") {
      
      result = result.filter(app => app.bookmarked === true);
    } else if (statusFilter !== "All Statuses") {
     
      result = result.filter(app => app.status === statusFilter);
    } 

    return [...result].sort((a, b) => (b.bookmarked ? 1 : 0) - (a.bookmarked ? 1 : 0));
  }, [applications, debouncedSearch, statusFilter]);

  

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="header-actions">
        <h1>My Applications</h1>
        
        <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search company or role..." 
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All Statuses">All Statuses</option>
            <option value="Bookmarked">Bookmarked</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <EmptyState message={searchTerm ? "No matches for your search." : "Start your journey by adding your first job application."} />
      ) : (
        <div className="card-grid">
          {filteredApps.map(app => (
            <JobCard 
              key={app.id} 
              job={app} 
              onDelete={deleteApp} 
              onBookmark={toggleBookmark} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;