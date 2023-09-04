import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'

export default function Home(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {

        if(!token){
            navigate("/"); 
          }

    },[]);

    function onClickResource () {
        navigate("/resource");
    };

    function onClickUsersList () {
        navigate("/UsersList");
    }

    function handleLogoutClick(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate("/")
    };


    return(
        <div>
            <button onClick={onClickResource}>Resource management</button>
            <button onClick={onClickUsersList}>UserList</button>
            <button onClick={handleLogoutClick} style={{backgroundColor:"red"}}>Log out</button>
        </div>
    )
}