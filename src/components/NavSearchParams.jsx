export const NavSearchParams = () => {
    return (
        <header>
            <nav className="header-nav">
                <ul>
                    <li><a href="?page=characters">Characters</a></li>
                    <li><a href="?page=locations">Locations</a></li>
                    <li><a href="?page=episodes">Episodes</a></li>
                </ul>
            </nav>
        </header>
    );
}