import { GrStatusGoodSmall } from "react-icons/gr";

const CharactersItem = ({ name, image, status, species }) => {
    return (
        <div className="characters-item">
            <img src={image} alt={name} />
            <div className="character-information">
                <h3>{name}</h3>
                <div className="status">
                    <span className={status}><GrStatusGoodSmall /></span>
                    <p>{status} - {species}</p>
                </div>
            </div>
        </div>
    );
}

export default CharactersItem;