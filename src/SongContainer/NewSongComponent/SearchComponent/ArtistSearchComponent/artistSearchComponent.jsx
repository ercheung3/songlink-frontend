import ArtistListComponent from "./ArtistListComponent/artistListComponent";
import { useState } from "react";

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
  const [isActive, setIsActive] = useState(false);
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

  const submitSearch = (e) => {
    props.getArtist(e);
    toggleIsActive();
  };
  return (
    <div>
      Artist Search
      <form onSubmit={submitSearch}>
        <input
          onChange={props.handleInputChange}
          type="text"
          name="searchArtist"
          placeholder="Artist Name"
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
      {isActive
        ? props.artist.listOfArtistsFromAPI.map((singleArtist) => {
            return (
              <ArtistListComponent
                setArtist={props.setArtist}
                artist={props.artist}
                toggleIsActive={toggleIsActive}
                singleArtist={singleArtist}
              ></ArtistListComponent>
            );
          })
        : ""}
    </div>
  );
};

export default ArtistSearchComponent;
