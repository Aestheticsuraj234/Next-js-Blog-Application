import React, { useState } from 'react';
import {BiSolidChevronDownCircle} from "react-icons/bi"

const CustomDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const options = ["Formal",
    "Casual",
    "Informative",
    "Humorous",
    "Persuasive",
    "Personal",
    "Educational"
  ]; // Replace with your actual options

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block ">
            <button
                type="button"
                className="py-4 px-8 font-bold rounded-lg bg-gray-200 text-gray-800  hover:bg-blue-100
                shadow-lg focus:outline-none"
                onClick={toggleDropdown}
            >
                {selectedOption || 'Select an option'}
               
            </button>
            {isOpen && (
                <ul className="absolute z-10 mt-1  mb-2 py-2 w-full bg-blue-300 rounded-md shadow-lg ">
                    {options.map((option) => (
                        <li
                            key={option}
                            className="px-4 py-2 text-gray-200 font-bold hover:bg-blue-500 cursor-pointer"
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
