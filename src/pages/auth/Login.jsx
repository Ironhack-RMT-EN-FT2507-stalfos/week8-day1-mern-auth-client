import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contact backend to validate user credentials
    const userCredentials = {
      email,
      password
    }

    try {
      
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, userCredentials)
      console.log(response)

      //* the user is now authenticated

      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser() // this verifies that the token was correctly stored and is valid. Also it updates the context states.

      navigate("/private-page-example")

    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400 ) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }
    }

  };

  return (
    <div>

      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Login;
