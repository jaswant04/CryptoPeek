import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = ({setIsOpen}) => {
    const [searchTerm, setSearch] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            alert("Please enter coin name first.");
            return;
        }
        if (searchTerm) {
            const id = searchTerm.toLowerCase();
            navigate(`/${id}`);
            setSearch("");
            setIsOpen(false);
        }

    }
    
    return (
        <div className='bg-white rounded-md text-black mx-auto lg:mr-4'>
            <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='search crypto...'
                className='input-search lg:pr-14 my-2 md:mx-4 ' />
            <button
                onClick={handleClick}
                className='search-btn xxs:px-2 xxl:ml-0 md:px-4 py-2 md:ml-4 bg-indigo-950 text-gray-400 hover:text-white rounded-md'
                type='submit'
            >Search</button>
        </div>
    )
}

export default Search
