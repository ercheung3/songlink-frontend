import ArtistListComponent from "./ArtistListComponent/artistListComponent";
/*
        setArtist({
          ...artist,
          listOfArtistsFromAPI: artistList,
        });
        */
/*
        //console.log(artist.listOfArtistsFromAPI);
        axios(artistResponse.data.artists.items[0].href, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        })
          .then((response) => {
            //data,status,statusText,headers,config,request
            console.log(
              "RESPONSE: " + Object.keys(response.data) + response.data.href
            );
          })
          .then(() => {
            console.log(
              "RESPONSE: " +
                Object.keys(artistResponse.data) +
                artistResponse.data.href
            );
            setArtist({
              ...artist,
              //Returns array of artists from reponse
              //Ask for set help
              artistAPI: artistResponse.data.artists.items[0].href,
            });
          });
        artistResponse.data.artists.items.map((artist) => {
          console.log(artist.id);
        });

        //console.log(artist.listOfArtistsFromAPI);
      });
    });
  };
  */

const ArtistSearchComponent = (props) => {
  return (
    <div>
      Artist Search
      <form onSubmit={props.getArtist}>
        <input
          onChange={props.handleInputChange}
          type="text"
          name="selectedArtist"
          placeholder="Artist Name"
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
      {props.artist.listOfArtistsFromAPI.map((artist) => {
        return <ArtistListComponent artist={artist}></ArtistListComponent>;
      })}
    </div>
  );
};

export default ArtistSearchComponent;
