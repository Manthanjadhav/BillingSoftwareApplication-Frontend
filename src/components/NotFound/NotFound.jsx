import "./NotFound.css";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="notfound-home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
