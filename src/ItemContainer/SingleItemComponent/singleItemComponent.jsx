import { useState } from "react";
const SingleItemComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [updateItem, setUpdateItem] = useState({
    productName: props.item.productName,
    quantity: props.item.quantity,
    _id: props.item._id,
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

  /**
   * @name handleInputChange
   * @description Changes value of item based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    setUpdateItem({
      //property spread notation
      ...updateItem,
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
  const submitUpdateItem = (e) => {
    e.preventDefault();
    /*This is an additional validation*/
    //There are easier ways to validate inputs
    //required, minLength, etc...
    let validSubmission = true;
    if (updateItem.productName.length < 2) {
      setIsValidState({
        valid: false,
        message: "Name needs to be longer.",
      });
      validSubmission = false;
    }
    if (validSubmission) {
      props.updateItem(props.item._id, updateItem);
      setUpdateItem({
        productName: updateItem.productName,
        quantity: updateItem.quantity,
      });
      setIsValidState({
        valid: true,
        message: "",
      });
      setIsActive(false);
    }
  };

  return (
    <div className="index-single-item">
      <h2>{props.item.productName}</h2>
      {props.item.quantity > 0 ? (
        <div className="index-single-item-details">
          <p>Quantity in stock: {props.item.quantity}</p>
        </div>
      ) : (
        <p>Out of Stock!</p>
      )}
      <button
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >
        DELETE ITEM
      </button>
      {/*COPIED FROM newItem, would use logic to check which form to use.*/}
      <>
        {
          //If isActive is true, show form
          isActive ? (
            <div id="new-item-form">
              <button onClick={toggleIsActive}>CLOSE FORM</button>
              {/*If there is more validation; use new function
                    TODO: props.functionToCall to change onSubmit to either new item or update item
                */}
              <form onSubmit={submitUpdateItem}>
                {/*Checks valid submission state from submitNewItem}*/}
                {isValidState.valid ? null : (
                  <p className="form-error">{isValidState.message}</p>
                )}
                {/*value={} is called data binding*/}
                Product Name:{" "}
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="productName"
                  value={updateItem.productName}
                ></input>
                Quantity:{" "}
                <input
                  onChange={handleInputChange}
                  type="number"
                  name="quantity"
                  value={updateItem.quantity}
                ></input>
                <br></br>
                <button type="submit">UPDATE ITEM</button>
              </form>
            </div>
          ) : (
            <button onClick={toggleIsActive}>EDIT THIS ITEM</button>
          )
        }
      </>
    </div>
  );
};

export default SingleItemComponent;
