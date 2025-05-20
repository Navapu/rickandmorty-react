import charactersData from '../mocks/mocksCharacters.json'
const Characters = () => {
    return (
        <div>
            <h1>Characters</h1>
            <ul>
                {charactersData.results.map(({id, name}) => (
                    <li key={id}>
                        <h3>{name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Characters;