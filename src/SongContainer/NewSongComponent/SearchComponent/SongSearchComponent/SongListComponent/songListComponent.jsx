import "./songListComponent.css";

const SongListComponent = (props) => {
  let audio;

  const trackInput = () => {
    stopPreview();
    props.setTracks({
      ...props.tracks,
      selectedTrack: props.singleTrack,
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

  return (
    <>
      {props.singleTrack.preview_url !== null ? (
        <div
          className="has-preview"
          onMouseEnter={playPreview}
          onMouseLeave={stopPreview}
          onClick={trackInput}
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
