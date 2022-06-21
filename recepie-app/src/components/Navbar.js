import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [inp, setInp] = useState("");
    const navigate = useNavigate();

    function Search(e){
        console.log(inp);
        if(inp === ""){
            alert("Please Enter a valid input!");
        }
        else{
            navigate(`/recepie/name/r?name=${inp}`);
        }
    }

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">RecepieFinder</Link>
                <form className="d-flex" role="search">
                    <input 
                    className="form-control me-2 search" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    onInput={e => setInp(e.target.value)}  />
                    <button className="btn" type="button" onClick={e => Search(e)}>Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;