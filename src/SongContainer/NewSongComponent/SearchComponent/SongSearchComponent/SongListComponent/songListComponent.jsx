import "./songListComponent.css";
import Badge from "react-bootstrap/Badge";

const SongListComponent = (props) => {
  let audio;

  const trackInput = () => {
    stopPreview();
    props.setTracks({
      ...props.tracks,
      selectedTrack: props.singleTrack,
    });
    props.toggleIsSongActive();
    props.toggleIsModalActive();
    //SET VALUE VARIABLES FOR INPUT
    props.setNewSong({
      title: props.singleTrack.name,
      artist: props.singleTrack.artists[0].name,
      albumTitle: props.singleTrack.album.name,
      albumArt: props.singleTrack.album.images[2].url,
      genre: props.genres[parseInt(Math.random() * props.genres.length)],
      media: props.singleTrack.external_urls.spotify,
    });
    //props.getTracks(true);
  };
  const playPreview = () => {
    if (props.singleTrack.is_playable) {
      if (props.singleTrack.preview_url !== null) {
        audio = new Audio(props.singleTrack.preview_url);
        audio.play();
      }
    }
  };
  const stopPreview = () => {
    if (props.singleTrack.is_playable)
      if (props.singleTrack.preview_url !== null) {
        audio.pause();
        audio.currentTime = 0;
      }
  };

  return (
    <>
      {props.singleTrack.preview_url !== null ? (
        <div
          className="has-preview"
          onMouseEnter={playPreview}
          onMouseLeave={stopPreview}
          onClick={trackInput}
        >
          <p>
            {props.singleTrack.name}
            <Badge bg="secondary">Listen</Badge>
          </p>
        </div>
      ) : (
        <div className="no-preview" onClick={trackInput}>
          <p>{props.singleTrack.name}</p>
        </div>
      )}
    </>
  );
};

export default SongListComponent;
