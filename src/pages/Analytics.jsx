import React, { useMemo } from 'react';
import { useApps } from '../context/ApplicationContext';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

const Analytics = () => {
  const { applications } = useApps();

  const statusData = useMemo(() => {
    const counts = {
      Applied: applications.filter(a => a.status === 'Applied').length,
      Interviewing: applications.filter(a => a.status === 'Interviewing').length,
      Offer: applications.filter(a => a.status === 'Offer').length,
      Rejected: applications.filter(a => a.status === 'Rejected').length,
    };

    const data = Object.keys(counts)
      .map(key => ({ name: key, value: counts[key] }))
      .filter(item => item.value > 0);

    return data.length > 0 ? data : [{ name: 'No Data', value: 1 }];
  }, [applications]);

  const monthlyData = useMemo(() => {
    if (applications.length === 0) return [{ month: 'N/A', count: 0 }];

    const months = applications.reduce((acc, app) => {
      const date = new Date(app.appliedDate);
      const monthName = isNaN(date) ? "Unknown" : date.toLocaleString('default', { month: 'short' });
      acc[monthName] = (acc[monthName] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(months).map(m => ({ month: m, count: months[m] }));
  }, [applications]);

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#cbd5e1'];

  return (
    <div className="page-wrapper">
      <h2 style={{ marginBottom: '20px' }}>Application Analytics</h2>
      
      <div className="analytics-grid">
        {/* Card 1: Pie Chart */}
        <div className="chart-card">
          <h3>Application Stages</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={statusData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Bar Chart */}
        <div className="chart-card">
          <h3>Monthly Volume</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;