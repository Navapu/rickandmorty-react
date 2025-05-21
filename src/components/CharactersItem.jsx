const CharactersItem = ({ name, image, status, species}) => {
    return (
        <div className="characters-item">
            <img src={image} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{status} - {species}</p>
            </div>
        </div>
    );
}

export default CharactersItem;