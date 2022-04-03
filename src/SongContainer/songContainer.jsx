import "./songContainer.css";
import { useEffect, useState } from "react";
import SingleSongComponent from "./SingleSongComponent/singleSongComponent";
import NewSongComponent from "./NewSongComponent/newSongComponent";
import FavoritesComponent from "./FavoritesComponent/favoritesComponent";
import DropdownCompartment from "../DropdownCompartment/dropdownCompartment";
const SongContainer = (props) => {
  const [songs, setSongs] = useState([]);
  const [newSongServerError, setNewSongServerError] = useState("");
  const [requestError, setRequestError] = useState("");

  const websiteURL = "https://songlink-backend.herokuapp.com/songs";

  const [favoriteSongs, setFavoriteSongs] = useState([
    "6249e7e97b371ce829bc42ce",
    "6249eaaa7b371ce829bc42d8",
  ]);
  /*
  Manually add new song, look up artist, or look up song
  3 different compartments
    1. fill out form for new song
    2. look up artist > click artist > list of songs > click song stretch:(back button with previous api call?)
    3. look up song > list of songs > click song
  preview of song (stretch)

  Look up artist and/or song title
  get search info from spotify
  add to database

  */

  //research bootstrap?

  /**
   * @name getSongs
   * @description Send API reponse to fetch all songs
   * @param none
   * @returns null
   */
  const getSongs = async () => {
    try {
      const songs = await fetch(`${websiteURL}`);
      const parsedSongs = await songs.json();
      setSongs(parsedSongs.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name createNewSong
   * @description Sends an API response with song content
   *
   * @param {Object} newSong
   * @returns null
   *
   */
  const createNewSong = async (newSong) => {
    /*Front-end only solution
        setItems([newItem, ...items])
        */

    //Send request to back-end, changed port to 3001
    const apiResponse = await fetch(`${websiteURL}`, {
      method: "POST",
      //body has to be a string!
      body: JSON.stringify(newSong),
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
      setSongs([...songs, parsedResponse.data]);
    } else {
      setNewSongServerError(parsedResponse.data.error);
      //TODO: REFACTOR STATE from newItemForm to here
    }
  };

  /**
   * @name updateSong
   * @description Sends an API response to update specific song with idToUpdate
   * @param {String} idToUpdate
   * @param {Object} songToUpdate
   * @returns null
   */
  const updateSong = async (idToUpdate, songToUpdate) => {
    const apiResponse = await fetch(`${websiteURL}/${idToUpdate}`, {
      method: "PUT",
      body: JSON.stringify(songToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
      const newSongs = songs.map((song) =>
        song._id === idToUpdate ? songToUpdate : song
      );
      setSongs(newSongs);
    } else {
      setRequestError(parsedResponse.data);
    }
  };

  /**
   * @name deleteSong
   * @description Sends API response to delete an specific song with idToDelete
   *
   * @param {String} idToDelete
   * @returns null
   */
  const deleteSong = async (idToDelete) => {
    try {
      const apiResponse = await fetch(`${websiteURL}/${idToDelete}`, {
        method: "DELETE",
      });
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
        const newSongs = songs.filter((song) => song._id !== idToDelete);

        //Set state with new items
        setSongs(newSongs);
      } else {
        setRequestError(parsedResponse.data);
      }
    } catch (err) {
      console.log(err);

      //TODO: Handle unsuccessful delete
    }
  };

  //API call function when page loads
  useEffect(getSongs, []);

  return (
    <div className="song-container">
      <div className="favorites-container">
        {songs.map((song) => {
          return favoriteSongs.map((favoriteSong) => {
            return song._id === favoriteSong ? (
              <FavoritesComponent song={song}></FavoritesComponent>
            ) : (
              ""
            );
          });
        })}
      </div>
      <NewSongComponent
        newSongServerError={newSongServerError}
        createNewSong={createNewSong}
        {...props}
      ></NewSongComponent>
      {/*If songs.map is null then send singlesongcomponent with key = "-1" from song._id*/}
      {/*newSongServerError, create new song, null song?*/}
      {/*how to check for length of object or map songs.map.length returns 1 always */}
      {/*check what happens to _id if given -1 and then made into a new song*/}
      {/*can you login to spotify without an account?*/}
      {songs.reverse().map((song) => {
        return (
          <SingleSongComponent
            key={song._id}
            song={song}
            deleteSong={deleteSong}
            updateSong={updateSong}
          ></SingleSongComponent>
        );
      })}
    </div>
  );
};

export default SongContainer;
