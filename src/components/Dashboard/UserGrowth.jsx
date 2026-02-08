import React, { useState } from 'react'
import { Select } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetGrowthQuery } from '../../page/redux/api/routeApi';

const UserGrowth = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const {data:userGrowth} = useGetGrowthQuery(selectedYear)
  console.log(userGrowth)
  
  const items = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const handleYearChange = (value) => {
    setSelectedYear(value); 
  };


  const chartData = userGrowth?.data?.data?.map(item => ({
    month: item.month,
    value: item.count, 
  })) || []; 

  return (
    <div>
      <div className=''>
        <div className="flex justify-between p-3 ">
          <p className="text-xl font-medium">User Growth</p>
          <Select
            defaultValue={selectedYear}
            onChange={handleYearChange}
            style={{ width: 120 }}
            options={items}
          />
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
  data={chartData}
  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  barSize={13}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" /> {/* ekhane month */}
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" stackId="a" fill="#495F48" radius={[25, 25, 0, 0]} /> {/* ekhane value */}
</BarChart>

          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default UserGrowth;
