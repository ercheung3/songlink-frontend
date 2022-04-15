import { useState, useEffect } from "react";

const LyricsContainer = () => {
  const [lyrics, setLyrics] = useState([]);
  const getLyrics = async () => {
    const getLyricsApiResponse = await fetch(
      "http://lolcahost:8000/api/lyrics"
    );
    const parsedLyrics = await getLyricsApiResponse.json();
    setLyrics(parsedLyrics);
  };

  return (
    <div>
      <h2>Lyrics Container</h2>
      <button onClick={getLyrics}>Get Lyrics</button>
      <p>The lyrics are: {JSON.stringify(lyrics)}</p>
    </div>
  );
};

export default LyricsContainer;
