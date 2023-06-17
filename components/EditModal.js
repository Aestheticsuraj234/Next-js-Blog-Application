import React, { useState, useContext, useEffect } from "react";
import { BlogContext } from "@/context/BlogContext";
import dynamic from 'next/dynamic';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

   const  Quill =()=> {
    return <QuillNoSSRWrapper  theme="snow" />
  }
  

export default function EditModal() {
  const { showEditModal, setShowEditModal } = useContext(BlogContext);
  const [image, setImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogKeyword, setBlogKeyword] = useState([]);
  const [blogCategory, setBlogCategory] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [editorState, setEditorState] = useState("");

  useEffect(() => {
    setBlogDescription(editorState);
  }, [editorState]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    switch (name) {
      case "image":
        if (files && files[0]) {
          setImage(files[0]);
        }
        break;
      case "blogTitle":
        setBlogTitle(value);
        break;
      case "blogKeyword":
        setBlogKeyword(value.split(","));
        break;
      case "blogCategory":
        setBlogCategory(value);
        break;
      default:
        break;
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  const saveBlogEdits = () => {
    if (!blogTitle || blogKeyword.length === 0 || !blogCategory) {
      return alert("Please enter all fields");
    }

    const data = JSON.parse(localStorage.getItem("Blogdata")) || [];

    if (image) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const imageDataUrl = event.target.result;

        const newData = {
          id: data.length + 1,
          image: imageDataUrl,
          blogTitle,
          blogCategory,
          blogDescription,
          blogKeyword,
          created_at: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };

        data.push(newData);
        localStorage.setItem("Blogdata", JSON.stringify(data));
        setShowEditModal(false);
        setImage(null);
        setBlogTitle("");
        setBlogKeyword([]);
        setBlogCategory("");
        setBlogDescription("");
      };

      reader.readAsDataURL(image);
    } else {
      const newData = {
        id: data.length + 1,
        image: "",
        blogTitle,
        blogCategory,
        blogDescription,
        blogKeyword,
        created_at: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      data.push(newData);
      localStorage.setItem("Blogdata", JSON.stringify(data));
      setShowEditModal(false);
      setImage(null);
      setBlogTitle("");
      setBlogKeyword([]);
      setBlogCategory("");
      setBlogDescription("");
    }
  };

  return (
    <>
      {showEditModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Blog Modal</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload Image
                  </label>
                  <input
                    onChange={handleChange}
                    name="image"
                    type="file"
                    accept="image/*"
                    multiple={false}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 mb-4 dark:focus:border-blue-500"
                    placeholder="E.g. What is Machine Learning"
                  />

                  <label htmlFor="blogTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blog Title
                  </label>
                  <input
                    value={blogTitle}
                    onChange={handleChange}
                    type="text"
                    name="blogTitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 "
                    placeholder="E.g. Machine Learning, Artificial Intelligence"
                  />

                  <label htmlFor="blogDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blog Description
                  </label>
                  <Quill
                    value={editorState}
                    onChange={setEditorState}
                    modules={modules}
                    formats={formats}
                    className="bg-white dark:bg-gray-700 dark:text-white"
                  />

                  <label htmlFor="blogKeyword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blog Keyword
                  </label>
                  <input
                    value={blogKeyword.join(",")}
                    onChange={handleChange}
                    type="text"
                    name="blogKeyword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 "
                    placeholder="E.g. Machine Learning, Artificial Intelligence"
                  />

                  <label htmlFor="blogCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blog Category
                  </label>
                  <input
                    value={blogCategory}
                    onChange={handleChange}
                    type="text"
                    name="blogCategory"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 "
                    placeholder="E.g. Machine Learning, Artificial Intelligence"
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveBlogEdits}
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
