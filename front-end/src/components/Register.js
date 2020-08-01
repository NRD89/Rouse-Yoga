import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../hooks/useAuth"

const Login = ({ redirect }) => {
  const { user, registerUser, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    registerUser(username, email, password)
      .then(res => {
        // set authed User in global context to update header/app state
        setUser(res.data.user)
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
        setError(error.response.data)
        setLoading(false)
      })
  }

  return (
    <div>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={e => {
              setUsername(e.target.value)
            }}
            value={username}
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={e => {
              setEmail(e.target.value)
            }}
            value={email}
            id="email"
            type="email"
            placeholder="email@email.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={e => {
              setPassword(e.target.value)
            }}
            value={password}
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div>
          <button type="submit">{loading ? "Loading..." : "Sign In"}</button>
        </div>
      </form>
      {error.length > 1 && <p>{error}</p>}
      <p>&copy;2020 Gatsby Authentication. All rights reserved.</p>
    </div>
  )
}

export default Login
