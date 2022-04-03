import "./songListComponent.css";
import Badge from "react-bootstrap/Badge";

const SongListComponent = (props) => {
  let audio;
  let isPlayable = false;
  let previewUrl = "";
  if (props.singleTrack.is_playable) {
    if (props.singleTrack.preview_url !== null) {
      isPlayable = true;
      previewUrl = props.singleTrack.preview_url;
    }
  }

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
      albumArt: props.singleTrack.album.images[0].url,
      genre: props.genres[parseInt(Math.random() * props.genres.length)],
      media: props.singleTrack.external_urls.spotify,
      isPlayable: isPlayable,
      preview: previewUrl,
    });
    //props.getTracks(true);
  };
  const playPreview = () => {
    if (isPlayable) {
      audio = new Audio(previewUrl);
      audio.play();
    }
  };
  const stopPreview = () => {
    if (isPlayable) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <>
      {isPlayable ? (
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
