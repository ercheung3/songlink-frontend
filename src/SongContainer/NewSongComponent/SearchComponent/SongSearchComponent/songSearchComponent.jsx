import SongListComponent from "./SongListComponent/songListComponent";
import { useState } from "react";
const SongSearchComponent = (props) => {
  const [isSongActive, setIsSongActive] = useState(false);
  /**
   * @name toggleIsActive
   * @description changes state of isActive to show form
   *
   * @params none
   * @returns null
   */
  const toggleIsSongActive = () => {
    setIsSongActive(!isSongActive);
  };

  const submitSearch = (e) => {
    /*
          Song Search
      <form onSubmit={submitSearch}>
        <input
          onChange={props.handleInputChange}
          type="text"
          name="searchTrack"
          placeholder="Track Name"
        ></input>
        <button type="submit">SUBMIT</button>

        <br></br>
        <button onClick={toggleIsSongActive}>SHOW SONGS</button>
      </form>
    */
    //props.getTracks(e);
    //toggleIsActive();
  };

  return (
    <div className="search-song">
      <button onClick={toggleIsSongActive}>SHOW SONGS</button>
      {isSongActive
        ? props.tracks.listOfTracksFromAPI.map((singleTrack) => {
            return (
              <SongListComponent
                key={singleTrack.id}
                setArtist={props.setArtist}
                artist={props.artist}
                getTracks={props.getTracks}
                toggleIsSongActive={toggleIsSongActive}
                singleTrack={singleTrack}
              ></SongListComponent>
            );
          })
        : ""}
    </div>
  );
};

export default SongSearchComponent;
