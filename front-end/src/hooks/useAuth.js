import React, { createContext, useState, useEffect } from "react"
import { navigate } from "gatsby"
import axios from "axios"
import Cookie from "js-cookie"
const apiURL = process.env.GATSBY_API_URL || "http://localhost:1337"

const defaultValues = {
  user: {},
  loggedIn: false,
  registerUser: () => {},
  login: () => {},
  logout: () => {},
}

export const AuthContext = createContext(defaultValues)

// Check if there is a browser
const isntBrowser = typeof window === "undefined"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValues.user)
  const [loggedIn, setLoggedIn] = useState(defaultValues.user)
  const isAuthenticated = loggedIn && Object.keys(user).length

  useEffect(() => {
    if (isntBrowser) {
      return
    }

    // grab token value from cookie
    const token = Cookie.get("token")

    if (token) {
      // Authenticate token through Strapi and place user object in defaultValues.user
      fetch(`${apiURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async res => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token")
          setUser(defaultValues.user)
          return null
        }
        const data = await res.json()
        console.log(data)
        setUser(data)
        setLoggedIn(true)
      })
    }
  }, [])

  //register a new user
  const registerUser = (username, email, password) => {
    //prevent function from being ran on the server
    if (isntBrowser) {
      return
    }

    const stripeId = async () => {
      const response = await fetch(
        "https://zealous-sinoussi-36e62d.netlify.app/.netlify/functions/stripe-signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      ).then(res => res.json())

      return response.customerId
    }

    console.log(stripeId())

    return new Promise((resolve, reject) => {
      axios
        .post(`${apiURL}/auth/local/register`, {
          username,
          email,
          password,
        })
        .then(res => {
          //set token response from Strapi for server validation
          Cookie.set("token", res.data.jwt)

          //resolve the promise to set loading to false in SignUp form
          resolve(res)
          //redirect back to home page for restaurance selection
          navigate("/app")
        })
        .catch(error => {
          //reject the promise and pass the error object back to the form
          reject(error)
        })
    })
  }

  const login = (identifier, password) => {
    //prevent function from being ran on the server
    if (isntBrowser) {
      return
    }

    return new Promise((resolve, reject) => {
      axios
        .post(`${apiURL}/auth/local/`, { identifier, password })
        .then(res => {
          console.log(res)
          //set token response from Strapi for server validation
          Cookie.set("token", res.data.jwt)

          //resolve the promise to set loading to false in SignUp form
          resolve(res)

          //set loggedIn to true
          setLoggedIn(true)

          //redirect to dashboard to view user info
          navigate("/app")
        })
        .catch(error => {
          //reject the promise and pass the error object back to the form
          reject(error)
        })
    })
  }

  const logout = () => {
    //remove token and user cookie
    Cookie.remove("token")
    delete window.__user
    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now())
    //redirect to the home page
    navigate("/")
    setLoggedIn(defaultValues.loggedIn)
  }

  return (
    <AuthContext.Provider
      value={{
        ...defaultValues,
        user,
        setUser,
        isAuthenticated,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)
