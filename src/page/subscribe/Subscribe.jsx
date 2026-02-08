import React, { useState } from 'react';
import { useGetSubscribeQuery } from '../redux/api/settingApi';
import { Pagination } from 'antd';
import Navigate from '../../Navigate';

const Subscribe = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10;
  const { data: subscribeData, isLoading, isError } = useGetSubscribeQuery({ page: currentPage,
    limit: pageSize,});

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 mt-6">Failed to load subscribers.</p>;
  }

  const subscribers = subscribeData?.data?.data || [];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className=" bg-white p-3 h-[87vh] overflow-auto">
     <div className="flex justify-between">
        <Navigate title={"Subscribe"} />
     
      </div>

      {subscribers.length > 0 ? (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-left">No</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-left">Subscribed Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{item.email}</td>
                <td className="p-3 border">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600 mt-4">No subscribers found.</p>
      )}

      
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={subscribeData?.data?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Subscribe;
