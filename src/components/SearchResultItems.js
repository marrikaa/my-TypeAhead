import React from 'react';
import '../index.css'

function SearchResultItems ({users}){

    return (
        users.length !==0 && (
            <div className="dataResult">  
                {
                    users.map((user,key) => {
                        return (
                            <a className='dataItem' href={user.html_url} target="_blank">
                                <img src={user.avatar_url}></img>
                                <p>{ user.login }</p>
                            </a>
                        )
                    })
                }
            </div>
        )
    )
}

export default SearchResultItems;