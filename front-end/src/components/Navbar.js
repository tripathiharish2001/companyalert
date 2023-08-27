import { Link } from "react-router-dom";
import image1 from "../image/welcome-center.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// import image2 from "../image/playing.gif";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="container">
        <Link to="/" className="wrapper">
          <img src={image1} alt="" />
          <h1>DeadlineApply</h1>
        </Link>
        <div className="nav-links">
          {user && (
            <div>
              <span className="userName">👤{user.email.split("@")[0]}</span>
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
      <div className={isLoading ? "message" : "hidden"}>
        Server is busy, expect a 5-7 seconds of delay for the correct response
      </div>
      {setTimeout(() => {
        setIsLoading(false);
      }, 14000)}
    </>
  );
};

export default Navbar;
