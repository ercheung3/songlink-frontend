import "./App.css";
import SongContainer from "./SongContainer/songContainer";
import DropdownCompartment from "./DropdownCompartment/dropdownCompartment";
import axios from "axios";
import { React, useState, useEffect } from "react";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const spotifyURL = "https://accounts.spotify.com/api/token";
  const btoaString = btoa(clientId + ":" + clientSecret);

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

  return (
    <div className="App">
      <DropdownCompartment
        options={genres.listOfGenresFromAPI}
        selectedValue={genres.selectedGenre}
      ></DropdownCompartment>
      <h1>Song List</h1>
      <SongContainer></SongContainer>
    </div>
  );
}

export default App;
