import axios from "axios";
import { createContext, useEffect, useState } from "react";

// context component (component that sends the state contexts and functions)
const AuthContext = createContext()

// wrapper component (component that holds the states and functions to be shared)
function AuthWrapper(props) {

  // context states and functions
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    // at the start of the app, validate the user token
    authenticateUser()
  }, [])

  const authenticateUser = async () => {
    // this is the function that sends the token to the backend to verify it validity and received info about the owner of that token

    const authToken = localStorage.getItem("authToken")

    try {
      
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      })

      // if we get to this point it means that the backend validated the token
      console.log(response)
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsAuthenticating(false)

    } catch (error) {
      // if we go into the catch it means that the backend rejected the token
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)
    }

  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
  }

  if (isAuthenticating) {
    return (
      <h3>Authenticating User...</h3>
    )
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}