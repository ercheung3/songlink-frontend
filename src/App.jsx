import "./App.css";
import SongContainer from "./SongContainer/songContainer";
import DropdownCompartment from "./DropdownCompartment/dropdownCompartment";
import axios from "axios";
import { React, useState, useEffect } from "react";
import ArtistSearchComponent from "./SongContainer/NewSongComponent/SearchComponent/ArtistSearchComponent/artistSearchComponent";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const spotifyURL = "https://accounts.spotify.com/api/token";
  const btoaString = btoa(clientId + ":" + clientSecret);

  //API search when creating a new recommendation
  const data = [
    { value: 1, name: "A" },
    { value: 2, name: "B" },
    { value: 3, name: "C" },
  ];

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });

  const [artist, setArtist] = useState({
    searchArtist: "",
    selectedArtist: "",
    listOfArtistsFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });

  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {
    axios(spotifyURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoaString}`,
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios("https://api.spotify.com/v1/browse/categories", {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items,
        });
      });
    });
  }, [genres.selectedGenre, clientId, clientSecret, btoaString]);

  const getArtist = (e) => {
    e.preventDefault();
    axios(spotifyURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoaString}`,
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      // const tokenResponse = await axios.post(spotifyUrl, {})
      setToken(tokenResponse.data.access_token);
      const apiName = artist.searchArtist.replace(/ /g, "%20");
      console.log(apiName);
      axios(
        `https://api.spotify.com/v1/search?query=${apiName}&type=artist&locale=en-US&offset=0&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((artistResponse) => {
        console.log("ARTIST");
        //set artist is not working correctly
        console.log(artistResponse);
        setArtist({
          ...artist,
          listOfArtistsFromAPI: artistResponse.data.artists.items,
        });
      });
    });
  };

  /**
   * @name handleInputChange
   * @description Changes value of item based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    setArtist({
      //property spread notation
      ...artist,
      //e is event; we use target to allow for all input fields.
      [e.target.name]: e.target.value,
    });
    //console.log(artist.selectedArtist);
  };

  return (
    <div className="App">
      <DropdownCompartment
        options={genres.listOfGenresFromAPI}
        selectedValue={genres.selectedGenre}
      ></DropdownCompartment>

      <h1>Song List</h1>
      <SongContainer
        artist={artist}
        getArtist={getArtist}
        setArtist={setArtist}
        handleInputChange={handleInputChange}
      ></SongContainer>
    </div>
  );
}

export default App;
