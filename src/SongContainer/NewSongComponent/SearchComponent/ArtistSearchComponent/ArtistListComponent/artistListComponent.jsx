import "./artistListComponent.css";
const ArtistListComponent = (props) => {
  const artistInput = (e, singleArtist) => {
    props.setArtist({
      ...props.artist,
      selectedArtist: singleArtist.name,
      selectedArtistId: singleArtist.id,
      selectedArtistGenres: singleArtist.genres,
    });
    props.toggleIsActive();
    props.setIsSongActive(true);
    props.getTracks(e, true, singleArtist.id);
  };
  let imageSrc = "/music.jpg";
  if (props.singleArtist.images.length > 0)
    imageSrc = props.singleArtist.images[2].url;

  return (
    <div>
      <p>{props.singleArtist.name}</p>
      <img
        className="artist-list-image"
        onClick={(e) => artistInput(e, props.singleArtist)}
        src={imageSrc}
        alt={`${props.singleArtist.name}`}
      ></img>
    </div>
  );
};

export default ArtistListComponent;
