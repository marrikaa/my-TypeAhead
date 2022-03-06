import React,{ useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import '../index.css'
import fetchUsers from '../actions/actions';

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

    useEffect(()=>{
        fetchUsers(searchUser)
    },[searchUser]);
  
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
            {
                users.length !==0 && (
                    <div className="dataResult">  
                        {
                            users.map((value,key) => {
                                return (
                                    <a className='dataItem' href={value.html_url} target="_blank">
                                        <img src={value.avatar_url}></img>
                                        <p>{ value.login }</p>
                                    </a>
                                )
                            })
                        }
                    </div>
                )
            }    
        </div>
    )
}

export default SearchBar;