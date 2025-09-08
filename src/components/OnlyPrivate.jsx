// this is a wrapper component that will only allow pages to display if the user is logged in

import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function OnlyPrivate(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return props.children
  } else {
    return <Navigate to="/login"/>
  }

}
export default OnlyPrivate