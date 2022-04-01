import { useState } from "react";
import "./newSongComponent.css";
import SearchComponent from "./SearchComponent/searchComponent";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const NewSongComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newSong, setNewSong] = useState({});
  const [isValidState, setIsValidState] = useState({
    valid: true,
    message: "",
  });

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

  /**
   * @name toggleIsModalActive
   * @description changes state of isActive to show form
   *
   * @params none
   * @returns null
   */
  const toggleIsModalActive = () => {
    setIsModalActive(!isModalActive);
  };
  /**
   * @name handleInputChange
   * @description Changes value of item based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    setNewSong({
      //property spread notation
      ...newSong,
      //e is event; we use target to allow for all input fields.
      [e.target.name]: e.target.value,
    });
  };

  /**
   * @name submitNewSong
   * @description Validation function to check submission.
   * @param {Event} e
   * @returns null
   */
  const submitNewSong = (e) => {
    e.preventDefault();
    /*This is an additional validation*/
    //There are easier ways to validate inputs
    //required, minLength, etc...
    let validSubmission = true;
    if (newSong.title.length < 2) {
      setIsValidState({
        valid: false,
        message: "Song name needs to be longer.",
      });
      validSubmission = false;
    }
    if (validSubmission) {
      props.createNewSong(newSong);
      setNewSong({
        title: "",
        artist: "",
        albumTitle: "",
        //Link to default album art?
        albumArt: "",
        genre: "",
        media: "",
      });
      setIsValidState({
        valid: true,
        message: "",
      });
      setIsActive(false);
      setIsModalActive(false);
    }
  };

  return (
    //Works in react
    <>
      {
        //If isActive is true, show form
        isActive ? (
          <div id="new-song-form-container">
            <Modal show={isModalActive} onHide={toggleIsModalActive}>
              <Modal.Header closeButton>
                <Modal.Title>Find Song From Spotify</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SearchComponent
                  artist={props.artist}
                  getArtist={props.getArtist}
                  setArtist={props.setArtist}
                  getTracks={props.getTracks}
                  tracks={props.tracks}
                  setTracks={props.setTracks}
                  setNewSong={setNewSong}
                  isSongActive={props.isSongActive}
                  setIsSongActive={props.setIsSongActive}
                  toggleIsSongActive={props.toggleIsSongActive}
                  handleInputChange={props.handleInputChange}
                ></SearchComponent>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleIsModalActive}>
                  Close
                </Button>
                <Button variant="primary" onClick={toggleIsModalActive}>
                  Import Data
                </Button>
              </Modal.Footer>
            </Modal>
            {/*Maybe convert to module? */}
            <Button
              variant="primary"
              onClick={() => {
                toggleIsModalActive();
              }}
            >
              Spotify
            </Button>
            <Button
              closeButton
              variant="secondary"
              onClick={() => {
                toggleIsActive();
                toggleIsModalActive();
              }}
            >
              Close
            </Button>

            {/*If there is more validation; use new function
                    TODO: props.functionToCall to change onSubmit to either new item or update item
                */}
            <form className="new-song-form" onSubmit={submitNewSong}>
              {/*Checks valid submission state from submitNewItem}*/}
              {isValidState.valid ? null : (
                <p className="form-error">{isValidState.message}</p>
              )}
              {props.newSongServerError ? (
                <p className="form-error">{props.newSongServerError}</p>
              ) : null}
              {/*value={} is called data binding*/}
              <div className="form-inputs">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  value={newSong.title}
                  placeholder="Song Title"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="artist"
                  value={newSong.artist}
                  placeholder="Artist"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="albumTitle"
                  value={newSong.albumTitle}
                  placeholder="Album Title"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="albumArt"
                  value={newSong.albumArt}
                  placeholder="Album Art URL"
                ></input>
                {/*SHOULD BE CHANGED TO DROPDOWN MENU*/}
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="genre"
                  value={newSong.genre}
                  placeholder="Genre"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="media"
                  value={newSong.media}
                  placeholder="Media Link"
                ></input>
              </div>
              <button type="submit">CREATE NEW SONG</button>
            </form>
          </div>
        ) : (
          //If isActive is false, showButton
          <Button variant="primary" onClick={toggleIsActive}>
            Add A New Song!
          </Button>
        )
      }
    </>
  );
};

export default NewSongComponent;
