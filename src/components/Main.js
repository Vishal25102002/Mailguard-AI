import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './nillionimage.svg'; // Adjust this path as necessary
import "../App.css";

const Main = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [classification, setClassification] = useState(''); // New state for API response

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (inputValue.trim()) { // Check if input is not empty
            try {
                // Make POST request to FastAPI backend
                const response = await axios.post("http://127.0.0.1:8000/classify-email/", {
                    content: inputValue // Sending input value as payload
                });
                const result = response.data.classification; // Extract classification from response
    
                // Add to search history with classification result
                setItems((prevItems) => [...prevItems, `${inputValue} - ${result}`]);
                setClassification(result);  // Update classification state
            } catch (error) {
                console.error("Error calling API:", error); // Log error
                setClassification("Error fetching classification"); // Update state for error
            }
    
            setInputValue(''); // Clear the input field
        }
    };
    

    const clearHistory = () => setItems([]);
    const deleteItem = (index) => setItems((prevItems) => prevItems.filter((_, i) => i !== index));

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar for Search History */}
            <aside className="w-64 p-4 bg-white shadow-md border-r border-gray-200 fixed h-full">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Search History</h2>
                <ul className="space-y-2">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md hover:bg-indigo-100 transition">
                                <span className="truncate" title={item}>{item}</span>
                                <button onClick={() => deleteItem(index)} className="text-red-500 hover:text-red-700">&times;</button>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400">No search history available.</li>
                    )}
                </ul>
                {items.length > 0 && (
                    <button 
                        onClick={clearHistory} 
                        className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
                    >
                        Clear History
                    </button>
                )}
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow ml-64 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <img 
                            src={logo} 
                            alt="Nillion Logo" 
                            className="w-12 h-12 animate-spin-slow"
                        />
                        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide text-center">
                            MailGuard AI
                        </h1>
                    </div>
                    <p className="text-center text-lg text-gray-500 mb-8">Powered by Nillion</p>

                    <form className="flex items-center mb-6" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            className="flex-grow p-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            placeholder="Ask me anything..."
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button 
                            type="submit" 
                            className="bg-indigo-600 text-white px-5 py-3 rounded-r-md shadow hover:bg-indigo-700 transition-all"
                        >
                            Search
                        </button>
                    </form>

                    {/* Display classification result */}
                    {classification && (
                        <p className="text-center text-lg text-gray-600 mb-4">
                            Classification: <span className="font-bold">{classification}</span>
                        </p>
                    )}

                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-indigo-600 hover:underline">Help Center</a>
                        <a href="#" className="text-indigo-600 hover:underline">Contact Support</a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;
