import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './Welcome.css';

const Welcome = () => {

    const [recepies, setRecepies] = useState([]);

    useEffect(() => {
        fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=b7c662c2690640a9963ff656b76abe19")
            .then(response => response.json())
            .then(res => res.results)
            .then(res => setRecepies(res))
    }, [])

    const revealDiv = () => {
        var reveals = document.querySelectorAll('.reveal');

        for (var i = 0; i < reveals.length; i++) {

            var windowHeight = window.innerHeight;
            var revealTop = reveals[i].getBoundingClientRect().top;
            var revealPoint = 100;


            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            }
            else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener("scroll", revealDiv);

    return (
        <>
            <Navbar />
            <div className="content container-fluid">
                <h1>Here are some recepies for you to get started.</h1>
                <div className="row">
                    {recepies.map(recepies =>
                        <div className="recepie reveal active col-lg-6" key={recepies.id}>
                            <div
                                key={recepies.id}
                                className="recepie-inner">
                                <img src={recepies.image} alt="..."  className='recepie-img'/><br />
                                <Link
                                    to={`/recepie/id/r?id=${recepies.id}`}
                                    className="recepie-link">
                                    {recepies.title}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Welcome;