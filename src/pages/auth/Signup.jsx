// import axios from "axios";
import service from "../../services/config.services.js"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contact backend to register the user
    const newUser = {
      email,
      username,
      password
    }

    try {
      
      // const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, newUser)
      const response = await service.post("/auth/signup", newUser)
      console.log(response)
      navigate("/login")

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

      <h1>Signup Form</h1>
    
      <form onSubmit={handleSignup}>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
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

        <button type="submit">Signup</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Signup;
