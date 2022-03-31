import "./songListComponent.css";

const SongListComponent = (props) => {
  let audio;
  const trackInput = (singleTrack) => {
    props.setTracks({
      ...props.tracks,
      selectedTrack: singleTrack.name,
    });
    props.toggleIsSongActive();
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
  /* <img
        className="track-list-image"
        onClick={() => trackInput(props.singleTrack)}
        src={`${props.singleTrack.images[2].url}`}
        alt={`${props.singleTrack.name}`}
      ></img>
      */
  return (
    <>
      {props.singleTrack.preview_url !== null ? (
        <div
          className="has-preview"
          onMouseEnter={playPreview}
          onMouseLeave={stopPreview}
        >
          <p>{props.singleTrack.name}</p>
        </div>
      ) : (
        <div className="no-preview">
          <p>{props.singleTrack.name}</p>
        </div>
      )}
    </>
  );
};

export default SongListComponent;
