import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EpisodesItem from '../components/EpisodesItem';

const Episodes = () => {
    const param2 = new URLSearchParams(window.location.search);

    const [episodes, setEpisodes] = useState([]);
    const [page, setPage] = useState(Number(param2.get("page")) || 1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState({ pages: 0, count: 0 });

    const [filters, setFilters] = useState({
        name: param2.get("name") || "",
        episode: param2.get("episode") || "",
    });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetchEpisodes();
    }, [page, filters]);

    const fetchEpisodes = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append("page", page);
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== "") {
                    params.append(key, value);
                }
            });

            const response = await fetch(
                `https://rickandmortyapi.com/api/episode/?${params.toString()}`
            );

            setSearchParams(params);

            if (!response.ok) {
                setEpisodes([]);
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setEpisodes(data.results);
            setInfo(data.info);
        } catch (err) {
            setError(err.message);
            console.log("Error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const prevPage = () => {
        if (page - 1 < 1) return;
        setPage((prev) => prev - 1);
    };

    const nextPage = () => {
        if (page >= info.pages) return;
        setPage((prev) => prev + 1);
    };

    const { name, episode } = filters;

    return (
        <div className="episodes-container">
            <h1 className="episodes-title">Episodes</h1>

            <div className="episodes-filters">
                <input type="text" className="episodes-input" placeholder="Search by name" value={name} onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
                <input type="text" className="episodes-input" placeholder="Search by code (S01E01)" value={episode} onChange={(e) => setFilters({ ...filters, episode: e.target.value })}/>
            </div>

            <h2 className="episodes-info"> Episodes: {info.count} , Pages: {info.pages}</h2>

            <div className="episodes-pagination">
                <button className="navigation-button" onClick={prevPage} disabled={page === 1}> Previous </button>
                <span className="episodes-page">{page}</span>
                <button className="navigation-button" onClick={nextPage} disabled={page >= info.pages}> Next </button>
            </div>

            {isLoading && <div className="episodes-loading">Loading data...</div>}
            {error && <p className="episodes-error">Error loading episodes: {error}</p>}

            <ul className="episodes-list">
                {episodes.map((ep) => (
                    <EpisodesItem {...ep} key={ep.id} />
                ))}
            </ul>
        </div>
    );
};

export default Episodes;
