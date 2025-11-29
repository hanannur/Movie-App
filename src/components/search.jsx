import React from 'react';
import searchicon from '../assets/search-icon.png';
const Search = ({searchTerm , setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src={searchicon}  alt="Search"/>
            <input
                type="text"
                placeholder='Search thouhands of movies'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
        </div>

    </div>
  )
}

export default Search