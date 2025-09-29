import { Link } from 'react-router-dom';
import { RiAliensFill } from "react-icons/ri";
import { FaTv, FaMapMarkedAlt } from "react-icons/fa";

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Rick & Morty Explorer</h1>
            <p className="home-subtitle"> Explora personajes, episodios y localizaciones de tu serie favorita. </p>

            <div className="home-cards">
                <Link to="/characters" className="home-card">
                    <RiAliensFill className="home-card-icon" />
                    <h2>Characters</h2>
                    <p>Descubre todos los personajes de Rick & Morty.</p>
                </Link>

                <Link to="/episodes" className="home-card">
                    <FaTv className="home-card-icon" />
                    <h2>Episodes</h2>
                    <p>Consulta todos los episodios de la serie con detalles.</p>
                </Link>

                <Link to="/locations" className="home-card">
                    <FaMapMarkedAlt className="home-card-icon" />
                    <h2>Locations</h2>
                    <p>Explora las dimensiones y localizaciones de Rick & Morty.</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;
