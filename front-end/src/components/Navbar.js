import { Link } from "react-router-dom";
import image1 from "../image/welcome-center.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import image2 from "../image/playing.gif";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="container">
      <Link to="/" className="wrapper">
        <img src={image1} alt="" />
        <h1>DeadlineApply</h1>
      </Link>
      <div className="nav-links">
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick} className="btn-logout">
              Log out
            </button>
          </div>
        )}
        {/* <Link to="/" className="links">
          Home
        </Link> */}

        {!user && (
          <div>
            <Link to="/login" className="links">
              Login
            </Link>
            <Link to="/signup" className="links">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
