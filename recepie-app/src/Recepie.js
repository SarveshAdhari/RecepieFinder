import { useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

import './Recepie.css';

const Recepie = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [rcp, setRcp] = useState([]);
    const [ingre, setIngre] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=c936f9bfa8ef4a69b6612af874a2b5f8`)
            .then(response => response.json())
            .then(response => {
                setRcp(response);
                setIngre(response.extendedIngredients);
            })
            .then(setIsLoaded(true))
    }, [id])

    if (isLoaded === true) {
        return (
            <>
                <Navbar />
                <div className="recepie-content">
                    <h1>{rcp.title}</h1><br />
                    <img src={rcp.image} alt="recepie_image" className="recepie-image"></img>
                    <h4 className="summary-title">Summary:</h4><br />
                    <p
                        dangerouslySetInnerHTML={{ __html: rcp['summary'] }}
                        className="summary-content">
                    </p>
                    <h4 className="summary-title">Instructions:</h4><br />
                    <strong className="serve-title">Serves:</strong> <span className="serve">{rcp.servings} person(s)</span><br /><br />
                    <strong className="ingredients-title">Ingredients:</strong><ul className="ingredients">
                        {ingre.map(ing => {
                            return (
                                <li key={id}>
                                    {ing.original}
                                </li>
                            )
                        }
                        )}
                    </ul><br />
                    <span className="steps">Steps:</span><br />
                    <p
                        dangerouslySetInnerHTML={{ __html: rcp['instructions'] }}
                        className="summary-content">
                    </p>

                </div>
                <Footer />
            </>
        );
    }
    else {
        return (
            <h1>Loading...</h1>
        );
    }
}

export default Recepie;