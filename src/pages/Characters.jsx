import charactersData from '../mocks/mocksCharacters.json'
import CharactersItem from '../components/CharactersItem';
import { RiAliensFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { FaSkull, FaHeart, FaQuestion } from "react-icons/fa";
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
const Characters = () => {
    const param2 = new URLSearchParams (window.location.search)

    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(Number(param2.get('page')) || 1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState([{pages: 0}])


    const [filters, setFilters] = useState({
        species: param2.get('species') || '',
        status: param2.get('status') || '',
        name: param2.get('name') || ''
    })
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetchCharacters()
    }, [page, filters])

    const fetchCharacters = async () => {
        try {
            setIsLoading(true)
            // Cleaning up a possible previous error
            setError(null)

            const params = new URLSearchParams();
            params.append("page", page)
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== "") {
                    params.append(key, value)
                }
            })
            const response = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`)

            setSearchParams(params)
            //Verify the answer
            if (!response.ok) {
                setCharacters([])
                throw new Error(`Error: ${response.status} - ${response.statusText}`)
            }
            const data = await response.json()
            setCharacters(data.results)
            setInfo(data.info)
        } catch (err) {
            setError(err.message)
            console.log("Error: ", { err })
        } finally {
            setIsLoading(false)
        }
    }

    const prevPage = () => {
        if (page - 1 < 1) { return };
        setPage(prev => prev - 1)
    }
    const nextPage = () => {
        if (page >= info.pages) { return; }
        setPage(prev => prev + 1)
    }
    const handleSpecies = (specie) => {
        setFilters({ ...filters, species: specie })
        // Reset to page 1 to avoid errors from invalid pages after species change
        setPage(1)
    }
    const handleStatus = (stat) => {
        setFilters({ ...filters, status: stat })
        // Reset to page 1 to avoid errors from invalid pages after species change
        setPage(1)
    }
    const { species, status, name } = filters;
    return (
        <div>
            <h1>Characters</h1>
            <div className='species-filter'>
                <button onClick={() => handleSpecies("alien")} className={species === 'alien' ? 'pressed' : null}><RiAliensFill /></button>
                <button onClick={() => handleSpecies("human")} className={species === 'human' ? 'pressed' : null}><IoPerson /></button>
                <button onClick={() => handleSpecies("")} className={species == '' ? 'pressed' : null}>All</button>
            </div>
            <div className='status-filter'>
                <button onClick={() => handleStatus("Alive")} className={status === 'Alive' ? 'pressed' : null}><FaHeart /></button>
                <button onClick={() => handleStatus("Dead")} className={status === 'Dead' ? 'pressed' : null}><FaSkull /></button>
                <button onClick={() => handleStatus("unknown")} className={status === 'unknown' ? 'pressed' : null}><FaQuestion /></button>
                <button onClick={() => handleStatus("")} className={status === '' ? 'pressed' : null}>All</button>
            </div>
            <input type="text" value={name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
            <br />
            <h2>Characters: {info.count} , Pages: {info.pages}</h2>
            <button onClick={prevPage} disabled={page === 1} className='navigation-button'>Previous</button>
            <span className='page'>{page}</span>
            <button onClick={nextPage} disabled={page >= info.pages} className='navigation-button'>Next</button>
            {isLoading && (<div>Loading data...</div>)}
            {error && <p>Error loading characters: {error}</p>}
            <ul className='characters-list'>
                {characters.map((character) => (
                    <CharactersItem {...character} key={character.id} />
                ))}
            </ul>
        </div>
    );
}

export default Characters;