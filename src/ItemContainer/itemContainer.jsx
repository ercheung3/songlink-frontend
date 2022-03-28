import { useEffect, useState } from "react";
import SingleItemComponent from "./SingleItemComponent/singleItemComponent";
import NewItemComponent from "./NewItemComponent/newItemComponent";

const ItemContainer = () => {
  const [items, setItems] = useState([]);
  const [newItemServerError, setNewItemServerError] = useState("");
  const [requestError, setRequestError] = useState("");

  /**
   * @name getItems
   * @description Send API reponse to fetch all items
   * @param none
   * @returns null
   */
  const getItems = async () => {
    try {
      const items = await fetch("http://localhost:3001/items");
      const parsedItems = await items.json();
      setItems(parsedItems.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name createNewItem
   * @description Sends an API response with item content
   *
   * @param {Object} newItem
   * @returns null
   *
   */
  const createNewItem = async (newItem) => {
    /*Front-end only solution
        setItems([newItem, ...items])
        */

    //Send request to back-end, changed port to 3001
    const apiResponse = await fetch("http://localhost:3001/items", {
      method: "POST",
      //body has to be a string!
      body: JSON.stringify(newItem),
      //Request had an issue with how it was sent with headers
      headers: {
        //Request is from json
        "Content-Type": "application/json",
      },
    });
    //Parse response from back-end
    const parsedResponse = await apiResponse.json();
    //If success is true:
    //Add the new item to state
    if (parsedResponse.success) {
      setItems([...items, parsedResponse.data]);
    } else {
      setNewItemServerError(parsedResponse.data.error);
      //TODO: REFACTOR STATE from newItemForm to here
    }
  };

  /**
   * @name updateItem
   * @description Sends an API response to update specific item with idToUpdate
   * @param {String} idToUpdate
   * @param {Object} itemToUpdate
   * @returns null
   */
  const updateItem = async (idToUpdate, itemToUpdate) => {
    const apiResponse = await fetch(
      `http://localhost:3001/items/${idToUpdate}`,
      {
        method: "PUT",
        body: JSON.stringify(itemToUpdate),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parsedResponse = await apiResponse.json();
    if (parsedResponse.success) {
      /*
    const newItems = [];
    //Javascript style function with array find item to update
    for (let i = 0; i < items.length; i++) {
      if (items[i]._id === idToUpdate) {
        //pushes the updated item
        newItems.push(itemToUpdate);
      } else {
        //pushes item from previous state
        newItems.push(items[i]);
      }
    }
    */
      //Simple one line to add updated item
      const newItems = items.map((item) =>
        item._id === idToUpdate ? itemToUpdate : item
      );
      setItems(newItems);
    } else {
      setRequestError(parsedResponse.data);
    }
  };

  /**
   * @name deleteItem
   * @description Sends API response to delete an specific item with idToDelete
   *
   * @param {String} idToDelete
   * @returns null
   */
  const deleteItem = async (idToDelete) => {
    try {
      const apiResponse = await fetch(
        `http://localhost:3001/items/${idToDelete}`,
        {
          method: "DELETE",
        }
      );
      const parsedResponse = await apiResponse.json();
      if (parsedResponse.success) {
        /*
        const newItems = [];
        //Javascript style function with array delete item
        for(let i = 0; i < items.length; i++) {
            //Checks to not add item with itemId to newItems
            if(items[i]._id !== idToDelete) newItems.push(items[i])
        }
        */

        //Creates collection for passed tests
        /*
       const newItems = items.filter((item) => {
           return item._id !== idToDelete
       })
       */
        //Simple one line to delete a single item
        const newItems = items.filter((item) => item._id !== idToDelete);

        //Set state with new items
        setItems(newItems);
      } else {
        setRequestError(parsedResponse.data);
      }
    } catch (err) {
      console.log(err);

      //TODO: Handle unsuccessful delete
    }
  };

  //API call function when page loads
  useEffect(getItems, []);

  return (
    <div>
      <h2>Items here!</h2>
      <NewItemComponent
        newItemServerError={newItemServerError}
        createNewItem={createNewItem}
      ></NewItemComponent>
      {items.reverse().map((item) => {
        return (
          <SingleItemComponent
            key={item._id}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          ></SingleItemComponent>
        );
      })}
    </div>
  );
};

export default ItemContainer;
