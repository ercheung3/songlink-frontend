import { useState, useEffect } from "react";
import SingleLyricsComponent from "./SingleLyricsComponent/singleLyricsComponent";
const LyricsContainer = () => {
  const [lyrics, setLyrics] = useState([]);

  const websiteURL = "http://localhost:8000/api/lyrics";
  const getLyrics = async () => {
    const getLyricsApiResponse = await fetch(websiteURL);
    const parsedLyrics = await getLyricsApiResponse.json();
    setLyrics(parsedLyrics);
  };

  return (
    <div>
      <h2>Lyrics Container</h2>
      <button onClick={getLyrics}>Get Lyrics</button>
      {lyrics.map((lyrics) => {
        return (
          console.log(lyrics.title),
          (
            <SingleLyricsComponent
              key={`lyrics-${lyrics.id}`}
              lyrics={lyrics}
            ></SingleLyricsComponent>
          )
        );
      })}
    </div>
  );
};

export default LyricsContainer;
