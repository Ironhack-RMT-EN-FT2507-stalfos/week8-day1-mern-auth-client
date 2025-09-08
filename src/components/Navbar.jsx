import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { authenticateUser, isLoggedIn } = useContext(AuthContext)

  const handleLogout = async () => {

    // remove the token
    localStorage.removeItem("authToken")

    try {
      
      // update the context states
      await authenticateUser()

      // redirect to a public page
      navigate("/")

    } catch (error) {
      navigate("/error")
    }

  }

  return (
    <nav>
      {/* public links */}
      <Link to="/">Home</Link>

      {/* anon links */}
      { !isLoggedIn && <Link to="/signup">Signup</Link> }
      { !isLoggedIn && <Link to="/login">Login</Link> }

      {/* private links */}
      { isLoggedIn && <Link to="/private-page-example">Private Page Example</Link> }
      { isLoggedIn && <Link onClick={handleLogout}>Logout</Link> }

    </nav>
  );
}

export default Navbar;
