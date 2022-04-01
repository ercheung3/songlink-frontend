import ArtistSearchComponent from "./ArtistSearchComponent/artistSearchComponent";
import SongSearchComponent from "./SongSearchComponent/songSearchComponent";
import "./searchComponent.css";

const SearchComponent = (props) => {
  return (
    <div className="search-container">
      <ArtistSearchComponent
        artist={props.artist}
        getArtist={props.getArtist}
        setArtist={props.setArtist}
        getTracks={props.getTracks}
        handleInputChange={props.handleInputChange}
      ></ArtistSearchComponent>
      <SongSearchComponent
        genres={props.artist.selectedArtistGenres}
        tracks={props.tracks}
        getTracks={props.getTracks}
        setTracks={props.setTracks}
        setNewSong={props.setNewSong}
      ></SongSearchComponent>
    </div>
  );
};

export default SearchComponent;
