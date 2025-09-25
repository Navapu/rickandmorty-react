const EpisodesItem = ({ name, episode, air_date, characters }) => {
  return (
    <li className="episodes-item">
      <div className="episode-information">
        <h3 className="episode-name">{episode} - {name}</h3>
        <p className="episode-airdate"><strong>Air date:</strong> {air_date}</p>
        <p className="episode-characters"><strong>Characters:</strong> {characters.length}</p>
      </div>
    </li>
  );
}

export default EpisodesItem;
