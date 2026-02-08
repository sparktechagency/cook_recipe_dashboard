import { Select } from 'antd';
import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useGetUserGrowthQuery } from '../../page/redux/api/routeApi';

export const SubscriptionGrowth = () => {
  const [selectedYear, setSelectedYear] = useState("2025"); 
  const { data: chartDataResponse, isLoading } = useGetUserGrowthQuery(selectedYear);

  const handleYearChange = (value) => {
    setSelectedYear(value); 
  };

  const items = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  
  const chartData = chartDataResponse?.data?.data?.map(item => ({
    month: item.month,
    value: item.count, 
  })) || []; 

  return (
    <div>
      <div className="flex justify-between p-3">
        <p className="text-xl font-medium">Subscription Growth</p>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: 120 }}
          options={items}
        />
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ResponsiveContainer width="95%" height={300}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#495F48"
              fill="#495F48"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
