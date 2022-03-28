import { useState } from "react";

const NewItemComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [newItem, setNewItem] = useState({});
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
   * @name handleInputChange
   * @description Changes value of item based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    setNewItem({
      //property spread notation
      ...newItem,
      //e is event; we use target to allow for all input fields.
      [e.target.name]: e.target.value,
    });
  };

  /**
   * @name submitNewItem
   * @description Validation function to check submission.
   * @param {Event} e
   * @returns null
   */
  const submitNewItem = (e) => {
    e.preventDefault();
    /*This is an additional validation*/
    //There are easier ways to validate inputs
    //required, minLength, etc...
    let validSubmission = true;
    if (newItem.productName.length < 2) {
      setIsValidState({
        valid: false,
        message: "Name needs to be longer.",
      });
      validSubmission = false;
    }
    if (validSubmission) {
      props.createNewItem(newItem);
      setNewItem({
        productName: "",
        quantity: 0,
      });
      setIsValidState({
        valid: true,
        message: "",
      });
      setIsActive(false);
    }
  };

  return (
    //Works in react
    <>
      {
        //If isActive is true, show form
        isActive ? (
          <div id="new-item-form">
            <button onClick={toggleIsActive}>CLOSE FORM</button>
            {/*If there is more validation; use new function
                    TODO: props.functionToCall to change onSubmit to either new item or update item
                */}
            <form onSubmit={submitNewItem}>
              {/*Checks valid submission state from submitNewItem}*/}
              {isValidState.valid ? null : (
                <p className="form-error">{isValidState.message}</p>
              )}
              {props.newItemServerError ? (
                <p className="form-error">{props.newItemServerError}</p>
              ) : null}
              {/*value={} is called data binding*/}
              Product Name:{" "}
              <input
                onChange={handleInputChange}
                type="text"
                name="productName"
                value={newItem.productName}
              ></input>
              Quantity:{" "}
              <input
                onChange={handleInputChange}
                type="number"
                name="quantity"
                value={newItem.quantity}
              ></input>
              <br></br>
              <button type="submit">CREATE NEW ITEM</button>
            </form>
          </div>
        ) : (
          //If isActive is false, showButton
          <button onClick={toggleIsActive}>CREATE NEW ITEM</button>
        )
      }
    </>
  );
};

export default NewItemComponent;
