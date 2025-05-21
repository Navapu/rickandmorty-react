import charactersData from '../mocks/mocksCharacters.json'
import CharactersItem from '../components/CharactersItem';
import { RiAliensFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

import { useEffect, useState } from 'react';
const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState([])
    const [species, setSpecies] = useState("")


    useEffect(() => {
        fetchCharacters()
    }, [page, species])

    const fetchCharacters = async () => {
        try{
            setIsLoading(true)
            // Cleaning up a possible previous error
            setError(null)
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&species=${species}`)

            //Verify the answer
            if(!response.ok){
                throw new Error(`Error: ${response.status} - ${response.statusText}`)
            }
            const data = await response.json()
            setCharacters(data.results)
            setInfo(data.info)
        }catch(err){
            setError(err.message)
            console.log("Error: ", {e})
        }finally{
            setIsLoading(false)
        }
    }

    const prevPage = () => {
        if(page - 1 < 1){return};
        setPage(prev => prev - 1)
    }
    const nextPage = () => {
        if(page + 1 > info.pages){return;}
        setPage(prev => prev + 1)
    }
    const handleSpecies = (specie) => {
        setSpecies(specie)
        // Reset to page 1 to avoid errors from invalid pages after species change
        setPage(1)
    }
    return (
        <div>
            <h1>Characters</h1>
            <button onClick={() => handleSpecies("alien")} className={species === 'alien' && 'pressed'}><RiAliensFill /></button>
            <button onClick={() => handleSpecies("human")} className={species === 'human' && 'pressed'}><IoPerson /></button>
            <button onClick={() => handleSpecies("")} className={species === '' && 'pressed'}>All</button>
            <br />
            <button onClick={prevPage} disabled={page === 1}>Previous</button>
            <span>{page}</span>
            <button onClick={nextPage} disabled={page + 1 > info.pages}>Next</button>
            {isLoading && (<div>Loading data...</div>)}
            {error && <p>Error loading characters: {error}</p>}
            <ul className='characters-list'>
                {characters.map((character) => (
                    <CharactersItem {...character} key={character.id}/>
                ))}
            </ul>
        </div>
    );
}

export default Characters;