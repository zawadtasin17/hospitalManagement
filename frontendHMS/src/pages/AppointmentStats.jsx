import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dark, saturated colors visible on white bg with white text inside slices
const COLORS = ['#0D3B66', '#8B0000', '#B8860B', '#0B5345', '#6A1B9A', '#B45F06'];

// Label renderer with white text inside dark slices
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#110909ff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontWeight="bold"
      fontSize={14}
      style={{ textShadow: '0 0 0px rgba(0,0,0,0.7)' }} // subtle shadow for crispness
    >
      {`${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

function AppointmentStats({ doctorId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:8080/doctors';

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/${doctorId}/stats`);
        setStats(res.data);
        setLoading(false);
      } catch {
        setError('Failed to load appointment statistics.');
        setLoading(false);
      }
    }
    fetchStats();
  }, [doctorId]);

  if (loading) return <div>Loading Appointment Statistics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const data = stats
    ? Object.entries(stats).map(([key, value]) => ({
        name: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
        value: Number(value),
      }))
    : [];

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center">Appointment Statistics</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={180}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [value, 'Appointments']}
              contentStyle={{ backgroundColor: '#f5eeeeff', borderRadius: 8, color: '#c72323ff' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-600">No statistics available.</p>
      )}
    </section>
  );
}

export default AppointmentStats;
