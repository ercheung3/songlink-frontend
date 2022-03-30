const ArtistListComponent = (props) => {
  return (
    <div>
      <p>{props.artist.name}</p>
      <img
        src={`${props.artist.images[2].url}`}
        alt={`${props.artist.name}`}
      ></img>
    </div>
  );
};

export default ArtistListComponent;
