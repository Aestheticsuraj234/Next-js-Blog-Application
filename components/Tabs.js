import React, { useContext, useState } from 'react';
import Table from './Table';
import { BlogContext } from '@/context/BlogContext';
import { ToastContainer } from 'react-toastify';

const Tabs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { showModal, setShowModal } = useContext(BlogContext)

const AddingTopic = ()=>{
  setShowModal(true);
}

  const categories = ['All', 'Node-js', 'React-js', 'Python', 'Next-js']; // Update with your available categories

  const handleTabClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
       <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
      <div className="border-b border-gray-200 dark:border-gray-700 flex justify-between items-center m-12">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {categories.map((category) => (
            <li className="mr-2" key={category}>
              <a
                href="#"
                className={`inline-flex p-4 border-b-4 ${selectedCategory === category
                    ? 'border-[#00BFA6] hover:text-gray-600  dark:hover:text-gray-300'
                    : 'border-transparent hover:text-gray-600  dark:hover:text-gray-300 group'
                  }`}
                onClick={() => handleTabClick(category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-white bg-[#00BFA6] hover:bg-[#188576] focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={AddingTopic}
        >
          Add Topic
        </button>
      </div>
      <Table selectedCategory={selectedCategory} />
    </>
  );
};

export default Tabs;
