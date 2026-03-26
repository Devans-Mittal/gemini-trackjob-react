// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import Applications from './Applications';
// import JobForm from './JobForm';
// import axios from 'axios';
// import './App.css';

// const JobContext = createContext();

// export const App = () => {
//   const [jobs, setJobs] = useState(() => {
//     const saved = localStorage.getItem('smart_jobs');
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('smart_jobs', JSON.stringify(jobs));
//   }, [jobs]);

//   useEffect(() => {
//     const fetchMockJobs = async () => {
//       // Only fetch if local storage is empty
//       if (jobs.length === 0) {
//         try {
//           const response = await axios.get('https://dummyjson.com/products?limit=5');
//           const mockJobs = response.data.products.map(p => ({
//             id: p.id.toString(),
//             company: p.brand || "Tech Corp",
//             role: p.category,
//             location: "Remote",
//             salary: p.price * 10,
//             status: "Applied",
//             appliedDate: new Date().toISOString().split('T')[0],
//             bookmarked: false
//           }));
//           setJobs(mockJobs);
//         } catch (err) {
//           console.error("Failed to fetch mock data", err);
//         }
//       }
//     };
//     fetchMockJobs();
//   }, []);

//   const addJob = (job) => setJobs([...jobs, { ...job, id: Date.now().toString(), bookmarked: false }]);
//   const deleteJob = (id) => setJobs(jobs.filter(j => j.id !== id));
//   const updateJob = (id, updated) => setJobs(jobs.map(j => j.id === id ? {...j, ...updated} : j));
//   const toggleBookmark = (id) => setJobs(jobs.map(j => j.id === id ? {...j, bookmarked: !j.bookmarked} : j));

//   return (
//     <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob, toggleBookmark }}>
//       <Router>
//         <nav className="navbar">
//           <div className="nav-logo">SmartJob Tracker</div>
//           <div className="nav-links">
//             <Link to="/">Dashboard</Link>
//             <Link to="/applications">My Jobs</Link>
//             <Link to="/add">Add Application</Link>
//           </div>
//         </nav>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/applications" element={<Applications />} />
//           <Route path="/add" element={<JobForm />} />
//           <Route path="/edit/:id" element={<JobForm />} />
//         </Routes>
//       </Router>
//     </JobContext.Provider>
//   );
// };

// export const useJobs = () => useContext(JobContext);
// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext"; 
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import JobForm from "./pages/JobForm"; 
import Analytics from "./pages/Analytics";

import "./index.css";

function App() {
  return (
    <ApplicationProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<JobForm />} />
              <Route path="/applications/:id" element={<JobForm />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApplicationProvider>
  );
}

export default App;