import React, { useState } from 'react';
import Logo from "./mailguard_icon.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="flex items-center justify-between p-5 bg-white shadow-md relative z-10">
            <div>
                <span className="text-2xl font-extrabold text-indigo-600">
                    <img src={Logo} width="50px" alt="Logo" />
                </span>
            </div>
            <nav className="hidden md:flex justify-between space-x-6">
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Home</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">About</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Services</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Contact</a>
            </nav>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-indigo-600 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu with Overlay */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-25 z-20" onClick={toggleMenu}></div>
                    <nav className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-30 flex flex-col items-start space-y-6 p-6 transition-transform duration-300 ease-in-out">
                        <button onClick={toggleMenu} className="self-end mb-4 text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <a href="#" className="text-indigo-600 hover:text-indigo-400 transition-colors duration-300">Home</a>
                        <a href="#" className="text-indigo-600 hover:text-indigo-400 transition-colors duration-300">About</a>
                        <a href="#" className="text-indigo-600 hover:text-indigo-400 transition-colors duration-300">Services</a>
                        <a href="#" className="text-indigo-600 hover:text-indigo-400 transition-colors duration-300">Contact</a>
                    </nav>
                </>
            )}
        </header>
    );
};

export default Header;
