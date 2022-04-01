import SongListComponent from "./SongListComponent/songListComponent";
import { useState } from "react";
const SongSearchComponent = (props) => {
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
      <button onClick={props.toggleIsSongActive}>SHOW SONGS</button>
      {props.isSongActive
        ? props.tracks.listOfTracksFromAPI.map((singleTrack) => {
            return (
              <SongListComponent
                key={singleTrack.id}
                setArtist={props.setArtist}
                genres={props.genres}
                getTracks={props.getTracks}
                setTracks={props.setTracks}
                setNewSong={props.setNewSong}
                toggleIsSongActive={props.toggleIsSongActive}
                singleTrack={singleTrack}
              ></SongListComponent>
            );
          })
        : ""}
    </div>
  );
};

export default SongSearchComponent;
