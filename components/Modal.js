import React, { useState } from "react";
import { useContext } from "react";
import { BlogContext } from "@/context/BlogContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Modal() {
  const { showModal, setShowModal } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState([]);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Use computed property names to dynamically update the state
    // based on the input name
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "keyword":
        setKeyword(value.split(","));
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };


  // Write a function which saves data into the localStorage in the form of an array of objects
  const saveData = () => {
    if (!title || keyword.length === 0 || !category) {
      return alert("Please enter all fields");
    }
    const data = JSON.parse(localStorage.getItem("data")) || [];

    const newData = {
      title: title,
      keywords: keyword,
      category: category,
    };

    data.push(newData);
    localStorage.setItem("data", JSON.stringify(data));
    
      
    setShowModal(false);
    setKeyword([]);
    setTitle("");
    setCategory("");
  };


  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
         
            {/* Same as */}
            <ToastContainer />
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Topic Name
                  </label>
                  <input
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 mb-4 dark:focus:border-blue-500"
                    placeholder="E.g. What is Machine Learning"
                  />

                  <label htmlFor="keyword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Topic Keyword
                  </label>
                  <input
                    value={keyword.join(",")}
                    onChange={handleChange}
                    type="text"
                    name="keyword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 "
                    placeholder="E.g. Machine Learning, Artificial Intelligence"
                  />

                  <label htmlFor="keyword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Topic Category
                  </label>
                  <input
                    value={category}
                    onChange={handleChange}
                    type="text"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  mb-2"
                    placeholder="E.g. Machine Learning"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveData}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
