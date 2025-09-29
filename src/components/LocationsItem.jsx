const LocationsItem = ({ name, type, dimension, residents }) => {
    return (
        <li className="locations-item">
            <div className="location-information">
                <h3 className="location-name">{name}</h3>
                <p className="location-type"><strong>Type:</strong> {type}</p>
                <p className="location-dimension"><strong>Dimension:</strong> {dimension}</p>
                <p className="location-residents"><strong>Residents:</strong> {residents.length}</p>
            </div>
        </li>
    );
}

export default LocationsItem;
