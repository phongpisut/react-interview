import logo from "./logo.svg";

const Header = () => {
  return (
    <div className="app-header">
      <img src={logo}></img>
      <span>Drivehub</span>
    </div>
  );
};

export default Header;
