import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [showEditModal , setShowEditModal] = React.useState(false);
  return (
    <BlogContext.Provider
      value={{
      showModal ,
      setShowModal,
      showEditModal,
    setShowEditModal                
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};