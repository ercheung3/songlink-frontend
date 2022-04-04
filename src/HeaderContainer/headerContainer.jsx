import "./headerContainer.css";
import Background from "../logo.png";

const HeaderContainer = () => {
  const logo = "/logo.svg";
  return (
    <div className="header">
      <div className="header-logo">
        <img src={Background} alt="logo"></img>
      </div>
    </div>
  );
};

export default HeaderContainer;
