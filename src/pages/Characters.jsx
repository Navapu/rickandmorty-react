import charactersData from '../mocks/mocksCharacters.json'
import CharactersItem from '../components/CharactersItem';
const Characters = () => {
    return (
        <div>
            <h1>Characters</h1>
            <ul className='characters-list'>
                {charactersData.results.map((character) => (
                    <CharactersItem {...character} />
                ))}
            </ul>
        </div>
    );
}

export default Characters;