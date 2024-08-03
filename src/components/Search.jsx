import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = ({setIsOpen}) => {
    const [searchTerm, setSearch] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (searchTerm === '') {
            alert("Please enter coin name first.");
        }
        if (searchTerm) {
            navigate(`/${searchTerm}`);
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
                className='input-search lg:pr-14 my-2 mx-4' />
            <button
                onClick={handleClick}
                className='search-btn px-4 py-2 ml-4 bg-indigo-950 text-gray-400 hover:text-white mr-1 rounded-md'
                type='submit'
            >Search</button>
        </div>
    )
}

export default Search