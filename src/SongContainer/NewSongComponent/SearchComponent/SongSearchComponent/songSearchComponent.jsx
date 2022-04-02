import SongListComponent from "./SongListComponent/songListComponent";
import { useState } from "react";
const SongSearchComponent = (props) => {
  /**
   * @name handleInputChange
   * @description Changes value of item based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    //console.log(e.target.name);
    props.setTracks({
      //property spread notation
      ...props.tracks,
      //e is event; we use target to allow for all input fields.
      [e.target.name]: e.target.value,
    });
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

    console.log("SUBMITTED SEARCH FOR SONG");

    props.getTracks(e, false, "");
    props.toggleIsSongActive();
    //toggleIsActive();
  };

  /*Song Search
      <form onSubmit={submitSearch}>
        <input
          onChange={handleInputChange}
          type="text"
          name="searchTrack"
          placeholder="Track Name"
        ></input>
        <button type="submit">SUBMIT</button>
      </form>*/

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
                toggleIsModalActive={props.toggleIsModalActive}
                singleTrack={singleTrack}
              ></SongListComponent>
            );
          })
        : ""}
    </div>
  );
};

export default SongSearchComponent;
