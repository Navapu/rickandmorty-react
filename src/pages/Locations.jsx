import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocationsItem from '../components/LocationsItem';

const Locations = () => {
    const param2 = new URLSearchParams(window.location.search);

    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(Number(param2.get("page")) || 1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState({ pages: 0, count: 0 });

    const [filters, setFilters] = useState({
        name: param2.get("name") || "",
        type: param2.get("type") || "",
    });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetchLocations();
    }, [page, filters]);

    const fetchLocations = async () => {
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
                `https://rickandmortyapi.com/api/location/?${params.toString()}`
            );

            setSearchParams(params);

            if (!response.ok) {
                setLocations([]);
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setLocations(data.results);
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
        setPage(prev => prev - 1);
    };

    const nextPage = () => {
        if (page >= info.pages) return;
        setPage(prev => prev + 1);
    };

    const { name, type } = filters;

    return (
        <div className="locations-container">
            <h1 className="locations-title">Locations</h1>

            <div className="locations-filters">
                <input type="text" className="locations-input" placeholder="Search by name" value={name} onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
                <input type="text" className="locations-input" placeholder="Search by type" value={type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}/>
            </div>

            <h2 className="locations-info"> Locations: {info.count} , Pages: {info.pages} </h2>

            <div className="locations-pagination">
                <button className="navigation-button" onClick={prevPage} disabled={page === 1}> Previous </button>
                <span className="locations-page">{page}</span>
                <button className="navigation-button" onClick={nextPage} disabled={page >= info.pages}> Next </button>
            </div>

            {isLoading && <div className="locations-loading">Loading data...</div>}
            {error && <p className="locations-error">Error loading locations: {error}</p>}

            <ul className="locations-list">
                {locations.map((loc) => (
                    <LocationsItem {...loc} key={loc.id} />
                ))}
            </ul>
        </div>
    );
};

export default Locations;
