import React, { useEffect, useState } from 'react';
import List from './List';
import Modal from './Modal';

const Table = ({ selectedCategory }) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const data = JSON.parse(localStorage.getItem('data')) || [];
      setListData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = (index) => {
    const updatedData = [...listData];
    updatedData.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(updatedData));
    setListData(updatedData);
  };

  const filteredData =
    selectedCategory === 'All'
      ? listData
      : listData.filter((item) => item.category.includes(selectedCategory));

  return (
    <div className="flex justify-between flex-col m-12">
      <p className="font-bold text-left text-blue-900">Recommended Topics</p>
      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : filteredData.length > 0 ? (
        <List data={filteredData} handleDelete={handleDelete} />
      ) : (
        <p className="text-gray-500">No data available for the selected category.</p>
      )}
      <Modal />
    </div>
  );
};

export default Table;
