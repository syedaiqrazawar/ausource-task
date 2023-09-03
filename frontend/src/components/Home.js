import React, { useEffect } from "react";
import Login from "./Login";
import {Link, useNavigate} from 'react-router-dom'

export default function Home(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {

        if(!token){
            navigate("/"); 
          }
          

    },[])

    function handleLogoutClick(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate("/")
    };


    return(
        <div>
            <button onClick={handleLogoutClick}>Log out</button>
            <h2>Home component renderedd</h2>
        </div>
    )
}