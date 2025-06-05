import { NavLink} from "react-router";
export const Navigation = () => {
    return (
        <header>
            <nav className="header-nav">
                <ul>
                    <li><NavLink to="/characters">Characters</NavLink></li>
                    <li><NavLink to="/locations">Locations</NavLink></li>
                    <li><NavLink to="/episodes">Episodes</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}