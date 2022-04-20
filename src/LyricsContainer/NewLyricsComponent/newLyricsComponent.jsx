import { useState } from "react";
import "./newLyricsComponent.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

const NewLyricsComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newLyrics, setNewLyrics] = useState({});
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
    setNewLyrics({
      //property spread notation
      ...newLyrics,
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
  const submitNewLyrics = (e) => {
    e.preventDefault();
    /*This is an additional validation*/
    //There are easier ways to validate inputs
    //required, minLength, etc...
    let validSubmission = true;
    if (validSubmission) {
      props.createNewLyrics(newLyrics);
      setNewLyrics({
        title: "",
        text: "",
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
          <div id="new-lyrics-form-container">
            <CloseButton
              className="close-button"
              onClick={() => {
                toggleIsActive();
                toggleIsModalActive();
              }}
            ></CloseButton>

            {/*If there is more validation; use new function
                    TODO: props.functionToCall to change onSubmit to either new item or update item
                */}
            <form className="new-lyrics-form" onSubmit={submitNewLyrics}>
              {/*Checks valid submission state from submitNewItem}*/}
              {isValidState.valid ? null : (
                <p className="form-error">{isValidState.message}</p>
              )}
              {props.newLyricsServerError ? (
                <p className="form-error">{props.newLyricsServerError}</p>
              ) : null}
              {/*value={} is called data binding*/}
              <div className="form-inputs">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  value={newLyrics.title}
                  placeholder="Song Title"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="text"
                  value={newLyrics.text}
                  placeholder="Lyrics"
                ></input>
              </div>
              <Button variant="primary" type="submit">
                Add New Lyrics
              </Button>
            </form>
          </div>
        ) : (
          //If isActive is false, showButton
          <div className="new-lyrics-button-container">
            <Button
              className="center"
              variant="primary"
              onClick={toggleIsActive}
            >
              Add New Lyrics!
            </Button>
          </div>
        )
      }
    </>
  );
};

export default NewLyricsComponent;
