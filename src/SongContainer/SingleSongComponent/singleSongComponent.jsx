import { useState } from "react";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import "./singleSongComponent.css";

const SingleSongComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [updateSong, setUpdateSong] = useState({
    title: props.song.title,
    artist: props.song.artist,
    albumTitle: props.song.albumTitle,
    albumArt: props.song.albumArt,
    genre: props.song.genre,
    media: props.song.media,
    id: props.song.id,
    isPlayable: props.song.isPlayable,
    preview: props.song.preview,
  });
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

  //Pass a parameter along with event (e)
  //Maybe onClick?
  //Can you check the class of button?
  //Check class > onSubmit
  //What would be within a song component?
  //if prop.song._id == "-1"? let it be known as newSong
  /**
   * @name handleInputChange
   * @description Changes value of song based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    try {
      setUpdateSong({
        //property spread notation
        ...updateSong,
        //e is event; we use target to allow for all input fields.
        [e.target.name]: e.target.value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name submitNewSong
   * @description Validation function to check submission.
   * @param {Event} e
   * @returns null
   */
  const submitUpdateItem = (e) => {
    e.preventDefault();
    /*This is an additional validation*/
    //There are easier ways to validate inputs
    //required, minLength, etc...
    let validSubmission = true;
    if (updateSong.title.length < 2) {
      setIsValidState({
        valid: false,
        message: "Song name needs to be longer.",
      });
      validSubmission = false;
    }
    if (updateSong.albumArt === "") updateSong.albumArt = "/music.jpg";

    if (validSubmission) {
      props.updateSong(props.song.id, updateSong);
      setUpdateSong({
        title: updateSong.title,
        artist: updateSong.artist,
        albumTitle: updateSong.albumTitle,
        albumArt: updateSong.albumArt,
        genre: updateSong.genre,
        media: updateSong.media,
        isPlayable: updateSong.isPlayable,
        preview: updateSong.preview,
      });
      setIsValidState({
        valid: true,
        message: "",
      });
      setIsActive(false);
    }
  };

  return (
    <>
      <Card className="single-song-container bg-dark text-white">
        <Card.Img
          className="single-song-info"
          src={props.song.albumArt}
          alt={props.song.title}
        />
        <Card.ImgOverlay
          style={{
            backgroundImage: `radial-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.8)), url(${props.song.albumArt})`,
          }}
          className="single-song-texts single-song"
        >
          <Card.Link href={props.song.media} target="_blank" rel="noreferrer">
            <Card.Title className="single-song-text single-song-title">
              {props.song.title}
            </Card.Title>
            <Card.Text className="single-song-text">
              {props.song.artist}
            </Card.Text>
          </Card.Link>
          {/* WORK ON BUTTONS AND MOVE TO BOTTOM */}
          <Button
            variation="danger"
            onClick={() => {
              props.deleteSong(props.song.id);
            }}
            className="change-button-delete"
          >
            <p>DELETE</p>
          </Button>
          {/*COPIED FROM newItem, would use logic to check which form to use.*/}
          <Button
            variation="primary"
            className="change-button-edit"
            onClick={toggleIsActive}
          >
            <p>EDIT</p>
          </Button>
        </Card.ImgOverlay>
      </Card>
      <>
        {isActive ? (
          <Offcanvas show={toggleIsActive} onHide={toggleIsActive} {...props}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Edit The Song</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="edit-form">
              {/*If there is more validation; use new function
                    TODO: props.functionToCall to change onSubmit to either new item or update item
                */}
              <form onSubmit={submitUpdateItem}>
                {/*Checks valid submission state from submitNewItem}*/}
                {isValidState.valid ? null : (
                  <p className="form-error">{isValidState.message}</p>
                )}
                {/*value={} is called data binding*/}
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  value={updateSong.title}
                  placeholder="Song Name"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="artist"
                  value={updateSong.artist}
                  placeholder="Artist Name"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="albumTitle"
                  value={updateSong.albumTitle}
                  placeholder="Album Title"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="albumArt"
                  value={updateSong.albumArt}
                  placeholder="Album Art URL"
                ></input>
                {/*SHOULD BE CHANGED TO DROPDOWN MENU*/}
                {/*Does select work with genre list? */}
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="genre"
                  value={updateSong.genre}
                  placeholder="Genre"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="media"
                  value={updateSong.media}
                  placeholder="Media Link"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="isPlayable"
                  value={updateSong.isPlayable}
                  placeholder="Playable"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="preview"
                  value={updateSong.preview}
                  placeholder="Preview Link"
                ></input>
                <br></br>
                <Button
                  variation="primary"
                  className="update-submit-button"
                  type="submit"
                >
                  UPDATE SONG
                </Button>
              </form>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default SingleSongComponent;
