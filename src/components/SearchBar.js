import React,{ useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import '../index.css'
import fetchUsers from '../actions/actions';
import SearchResultItems from './SearchResultItems'

function SearchBar ({placeholder}){
    const[searchUser,setSearchUser]=useState("");
    const[users, setUsers]=useState([]);

    const handleUserInput = (event)=>{
        const userInput=event.target.value;
        fetchUsers(userInput).then(filteredUsers => {
            setUsers(filteredUsers);
        });

        setSearchUser(userInput)
    }

    const clearInput =()=>{
        setUsers([]);
        setSearchUser("");
    }

    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type="text" placeholder={placeholder} value={searchUser} onChange={handleUserInput} />
                <div className='searchIcon'>
                    {searchUser.length ===0 ?<SearchIcon /> : <CloseIcon id="clearBtn" onClick={clearInput} />}
                </div>
            </div>

            <SearchResultItems users={ users } /> 
        </div>
    )
}

export default SearchBar;