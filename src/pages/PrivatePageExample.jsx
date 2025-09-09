import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context'

function PrivatePageExample() {

  const { role } = useContext(AuthContext)

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...

    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  return (
    <div>
      
      <h3>Private Page Example</h3>
      <p>Should only be visible for logged in users that already validated their credentials (login) and have a valid token</p>

      {role === "admin" && <button>Self-destruct</button> }

    </div>
  )
}

export default PrivatePageExample