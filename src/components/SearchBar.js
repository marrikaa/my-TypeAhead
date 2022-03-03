import React,{ useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './SearchBar.css'
import axios from 'axios';

function SearchBar ({placeholder}){
    const[searchUser,setSearchUser]=useState("");
    const[users, setUsers]=useState([]);
    const my_token="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";
    const my_user="marrikaa";
    const url='https://api.github.com/search/users?q=';

    const handleUserInput= (event)=>{
        const userInput=event.target.value;
        setSearchUser(userInput)
    }

    const fetchUsers = () => {
        axios.get(url + searchUser, {
            'auth': {
                'username': my_user,
                'token': my_token,
            },
            'headers': {
                'Authorization': `token ${my_token}` 
            }
        })
        .then(response => {
            const users = response.data.items;
            const updatedUsers = users.map(users => {
                return {
                    ...users,
                }
            })
            setUsers(updatedUsers)
        })
    }

    useEffect(()=>{
        fetchUsers(url + searchUser)
    },[url + searchUser]);
  
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