import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { AuthContext } from "../hooks/useAuth"

const Header = ({ siteTitle }) => {
  const { logout, user, setUser, isAuthenticated } = useContext(AuthContext)
  const handleLogout = e => {
    e.preventDefault()
    logout()
    setUser({})
  }

  console.log(Object.keys(user).length)

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <nav>
          {isAuthenticated ? (
            <h5>{user.username}</h5>
          ) : (
            <Link
              to="/register"
              style={{
                color: `white`,
                textDecoration: `none`,
                marginRight: `1rem`,
              }}
            >
              Sign up
            </Link>
          )}
          {isAuthenticated ? (
            <Link
              onClick={handleLogout}
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
