import { useState } from "react";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./singleLyricsComponent.css";
const SingleLyricsComponent = (props) => {
  const [isLyricsActive, setisLyricsActive] = useState(false);
  const [isLyricsModalActive, setisLyricsModalActive] = useState(false);

  const [updateLyrics, setUpdateLyrics] = useState({
    id: props.lyrics.id,
    title: props.lyrics.title,
    text: props.lyrics.text,
  });
  const [isLyricsValidState, setisLyricsValidState] = useState({
    valid: true,
    message: "",
  });

  /**
   * @name toggleisLyricsModalActive
   * @description changes state of isLyricsActive to show form
   *
   * @params none
   * @returns null
   */
  const toggleIsLyricsModalActive = () => {
    setisLyricsModalActive(!isLyricsModalActive);
  };

  /**
   * @name toggleisLyricsActive
   * @description changes state of isLyricsActive to show form
   *
   * @params none
   * @returns null
   */
  const toggleisLyricsActive = () => {
    setisLyricsActive(!isLyricsActive);
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
      setUpdateLyrics({
        //property spread notation
        ...updateLyrics,
        //e is event; we use target to allow for all input fields.
        [e.target.name]: e.target.value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name submitUpdateItem
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

    if (validSubmission) {
      props.updateLyrics(props.lyrics.id, updateLyrics);
      setUpdateLyrics({
        id: updateLyrics.id,
        title: updateLyrics.title,
        text: updateLyrics.text,
      });
      setisLyricsValidState({
        valid: true,
        message: "",
      });
      setisLyricsActive(false);
    }
  };

  return (
    <div className="single-lyrics-container">
      <h3 className="lyrics-title" onClick={toggleIsLyricsModalActive}>
        {props.lyrics.title}
      </h3>
      {/* WORK ON BUTTONS AND MOVE TO BOTTOM */}
      <Modal show={isLyricsModalActive} onHide={toggleIsLyricsModalActive}>
        <Modal.Header closeButton>
          <Modal.Title>{props.lyrics.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.lyrics.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variation="primary"
            onClick={() => {
              toggleisLyricsActive();
              setisLyricsModalActive(false);
            }}
          >
            <p>EDIT</p>
          </Button>
          <Button
            variation="danger"
            onClick={() => {
              props.deleteLyrics(props.lyrics.id);
              setisLyricsModalActive(false);
            }}
          >
            <p>DELETE</p>
          </Button>
        </Modal.Footer>
      </Modal>
      {/*COPIED FROM newItem, would use logic to check which form to use.*/}

      <>
        {isLyricsActive ? (
          <Offcanvas
            show={toggleisLyricsActive}
            onHide={toggleisLyricsActive}
            {...props}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Edit The Lyrics</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="edit-form">
              {/*If there is more validation; use new function
                    TODO: props.functionToCall to change onSubmit to either new item or update item
                */}
              <form onSubmit={submitUpdateItem}>
                {/*Checks valid submission state from submitNewItem}*/}
                {isLyricsValidState.valid ? null : (
                  <p className="form-error">{isLyricsValidState.message}</p>
                )}
                {/*value={} is called data binding*/}
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  value={updateLyrics.title}
                  placeholder="Song Name"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="text"
                  value={updateLyrics.text}
                  placeholder="Lyrics Text"
                  style={{ height: "50vh" }}
                ></input>
                <br></br>
                <Button
                  variation="primary"
                  className="update-submit-button"
                  type="submit"
                >
                  UPDATE LYRICS
                </Button>
              </form>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default SingleLyricsComponent;
