import { useSearchParams, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

import './Welcome.css';

const RecepieName = () => {

    const [recepies, setRecepies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=31b08f248e7b4d1a92542ee44d30f37e`)
            .then(response => response.json())
            .then(res => res.results)
            .then(res => setRecepies(res))
            .then(setIsLoaded(true))
    }, [name])

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
    if (isLoaded === true) {
        if (recepies.length > 0) {
            return (
                <>
                    <Navbar />
                    <div className="content">
                        <h1>Here are some recepies for you searched for.</h1>
                        <div className="row row-cols-2">
                            {recepies.map(recepies =>
                                <div className="recepie reveal active col-2" key={recepies.title}>
                                    <div
                                        key={recepies.id}
                                        className="recepie-inner">
                                        <img src={recepies.image} alt="..." className="recepie-img"/><br />
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
        else {
            return (
                <>
                    <Navbar />
                    <div className="content notFound">
                        <h1>Oops! No recepies found for {name}.</h1>
                    </div>
                    <Footer />
                </>
            );
        }
    }


}

export default RecepieName;