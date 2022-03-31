import "./artistListComponent.css";
const ArtistListComponent = (props) => {
  const ArtistInput = (name) => {
    props.setArtist({
      ...props.artist,
      selectedArtist: name,
    });
    props.toggleIsActive();
  };
  return (
    <div>
      <p>{props.singleArtist.name}</p>
      <img
        className="artist-list-image"
        onClick={() => ArtistInput(props.singleArtist.name)}
        src={`${props.singleArtist.images[2].url}`}
        alt={`${props.singleArtist.name}`}
      ></img>
    </div>
  );
};

export default ArtistListComponent;
