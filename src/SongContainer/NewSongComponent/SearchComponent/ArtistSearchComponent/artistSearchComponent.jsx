import ArtistListComponent from "./ArtistListComponent/artistListComponent";
import { useState } from "react";

const ArtistSearchComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  /**
   * @name toggleIsActive
   * @description changes state of isActive to show form
   *
   * @params none
   * @returns null
   */
  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const submitSearch = (e) => {
    props.getArtist(e);
    toggleIsActive();
    if (props.isSongActive === true) props.setIsSongActive = false;
  };
  return (
    <div className="search-artist">
      <form onSubmit={submitSearch}>
        <input
          onChange={props.handleInputChange}
          type="text"
          name="searchArtist"
          placeholder="Artist Name"
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
      {isActive
        ? props.artist.listOfArtistsFromAPI.map((singleArtist) => {
            return (
              <ArtistListComponent
                setIsSongActive={props.setIsSongActive}
                toggleIsSongActive={props.toggleIsSongActive}
                key={singleArtist.id}
                setArtist={props.setArtist}
                artist={props.artist}
                getTracks={props.getTracks}
                toggleIsActive={toggleIsActive}
                singleArtist={singleArtist}
              ></ArtistListComponent>
            );
          })
        : ""}
    </div>
  );
};

export default ArtistSearchComponent;
