import React, { createContext, useContext, useState, useEffect } from 'react';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('smart_tracker_apps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smart_tracker_apps', JSON.stringify(applications));
  }, [applications]);

  const addApp = (app) => setApplications([...applications, { ...app, id: Date.now().toString(), bookmarked: false }]);
  const updateApp = (id, updated) => setApplications(applications.map(a => a.id === id ? {...a, ...updated} : a));
  const deleteApp = (id) => setApplications(applications.filter(a => a.id !== id));
  const toggleBookmark = (id) => {
    setApplications((prev) => 
      prev.map((app) => 
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  };

  return (
    <ApplicationContext.Provider value={{ applications, setApplications, addApp, updateApp, deleteApp, toggleBookmark }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApps = () => useContext(ApplicationContext);