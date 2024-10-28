import React from 'react';
import "../App.css"

const Footer = () => {
    return (
        <footer className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-indigo-300 shadow-md relative z-10 ">
            <div className="container mx-auto text-center">
                <p className="text-gray-600 text-sm footer-text">
                    &copy; {new Date().getFullYear()} Nillion. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
