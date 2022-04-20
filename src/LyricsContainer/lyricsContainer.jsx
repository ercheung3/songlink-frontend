import { useState, useEffect } from "react";
import NewLyricsComponent from "./NewLyricsComponent/newLyricsComponent";
import SingleLyricsComponent from "./SingleLyricsComponent/singleLyricsComponent";
import "./lyricsContainer.css";
const LyricsContainer = () => {
  const [lyrics, setLyrics] = useState([]);
  const [newLyricsServerError, setNewLyricsServerError] = useState("");
  const [requestError, setRequestError] = useState("");
  const websiteURL = "http://localhost:8000/api/lyrics";
  /**
   * @name getLyrics
   * @description Send API reponse to fetch all Lyrics
   * @param none
   * @returns null
   */
  const getLyrics = async () => {
    try {
      const getLyricsApiResponse = await fetch(`${websiteURL}/`);
      const parsedLyrics = await getLyricsApiResponse.json();
      setLyrics(parsedLyrics);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name createNewLyrics
   * @description Sends an API response with Lyric content
   *
   * @param {Object} newLyrics
   * @returns null
   *
   */
  const createNewLyrics = async (newLyrics) => {
    /*Front-end only solution
        setItems([newItem, ...items])
        */

    //Send request to back-end, changed port to 3001
    const apiResponse = await fetch(`${websiteURL}/`, {
      method: "POST",
      //body has to be a string!
      body: JSON.stringify(newLyrics),
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
    if (apiResponse.status === 201) {
      setLyrics([...lyrics, parsedResponse]);
    } else {
      setNewLyricsServerError(parsedResponse);
      //TODO: REFACTOR STATE from newItemForm to here
    }
  };

  /**
   * @name updateLyrics
   * @description Sends an API response to update specific Lyric with idToUpdate
   * @param {String} idToUpdate
   * @param {Object} lyricsToUpdate
   * @returns null
   */
  const updateLyrics = async (idToUpdate, lyricsToUpdate) => {
    const apiResponse = await fetch(`${websiteURL}/${idToUpdate}`, {
      method: "PUT",
      body: JSON.stringify(lyricsToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await apiResponse.json();
    if (apiResponse.status === 200) {
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
      const newLyrics = lyrics.map((lyric) =>
        lyric.id === idToUpdate ? lyricsToUpdate : lyric
      );
      setLyrics(newLyrics);
    } else {
      setRequestError(parsedResponse);
    }
  };

  /**
   * @name deleteLyric
   * @description Sends API response to delete an specific Lyric with idToDelete
   *
   * @param {String} idToDelete
   * @returns null
   */
  const deleteLyrics = async (idToDelete) => {
    try {
      const apiResponse = await fetch(`${websiteURL}/${idToDelete}`, {
        method: "DELETE",
      });
      if (apiResponse === 204) {
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
        const newLyrics = lyrics.filter((lyric) => lyric.id !== idToDelete);

        //Set state with new items
        setLyrics(newLyrics);
      } else {
        setRequestError(apiResponse);
      }
    } catch (err) {
      console.log(err);

      //TODO: Handle unsuccessful delete
    }
  };

  //API call function when page loads
  useEffect(getLyrics, []);

  return (
    <div className="lyrics-container">
      <h2>Lyrics List</h2>
      <br></br>
      {lyrics.map((lyrics) => {
        return (
          <SingleLyricsComponent
            key={`lyrics-${lyrics.id}`}
            lyrics={lyrics}
            deleteLyrics={deleteLyrics}
            updateLyrics={updateLyrics}
          ></SingleLyricsComponent>
        );
      })}
      <NewLyricsComponent
        createNewLyrics={createNewLyrics}
      ></NewLyricsComponent>
    </div>
  );
};

export default LyricsContainer;
