import React, { useState , useContext } from 'react';
import { useRouter } from 'next/router';
import { BsFillGearFill } from 'react-icons/bs';
import CustomDropdown from '@/components/CustomDropDown';
import EditModal from '@/components/EditModal';
import { BlogContext } from '@/context/BlogContext';
const EditPage = () => {
  const router = useRouter();
  const { index } = router.query;
  const { showEditModal, setShowEditModal } = useContext(BlogContext)
  const [generatedResult, setGeneratedResult] = useState('');

  

  return (
    <div className='flex justify-between items-center flex-col'>
      <span className="font-extrabold text-transparent mx-auto text-4xl bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mt-10 mb-10 text-center px-3 py-4 border-2 border-dashed border-indigo-400 rounded-lg">
        Generate Your Blog in Single Click!
      </span>
      <img src='/blog.svg' height={450} width={450} alt="Blog Image" />
      <CustomDropdown/>
      <button type="button" class="text-white flex items-center justify-center gap-2 mt-10 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={()=>setShowEditModal(true)}>Generate <BsFillGearFill/></button>

      <EditModal/>
    </div>
  );
};

export default EditPage;
