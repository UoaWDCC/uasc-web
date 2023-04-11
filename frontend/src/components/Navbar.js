import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "lightblue",
      }}
    >
      <h1> UASC </h1>
      <div className="links" style={{ display: "flex" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
