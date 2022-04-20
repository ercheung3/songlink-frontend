import "./favoritesComponent.css";
import Card from "react-bootstrap/Card";

const FavoritesComponent = (props) => {
  let audio;

  const albumArtUrl = props.song.albumArt;
  const playPreview = () => {
    try {
      if (props.song.isPlayable) {
        audio = new Audio(props.song.preview);
        audio.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stopPreview = () => {
    try {
      if (props.song.isPlayable) {
        audio.pause();
        audio.currentTime = 0;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="favorites-info bg-dark text-white">
      <Card.Img
        className="favorites-info"
        src={albumArtUrl}
        alt={props.song.title}
      />
      <Card.ImgOverlay
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.8)), url(${albumArtUrl})`,
        }}
        className="favorites-texts favorites-info favorites"
      >
        <Card.Title className="favorites-text">{props.song.title}</Card.Title>
        <Card.Text className="favorites-text">{props.song.artist}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default FavoritesComponent;
