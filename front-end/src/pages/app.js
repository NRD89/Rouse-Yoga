import React, { useEffect, useContext } from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Navigation from "../components/app/Navigation"
import Dashboard from "../components/app/Dashboard"
import Account from "../components/app/Account"
import {AuthContext} from "../hooks/useAuth"
import { navigate } from "gatsby"

const App = ({ location }) => {
  const { user } = useContext(AuthContext)
  const redirect = location.pathname.split("/").pop()
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { redirect } })
    }
  }, [user, redirect])

  return (
    <Layout>
      <pre>
        { JSON.stringify(user, null, 2) }
      </pre>
      <Navigation />
      <Router basepath="/app">
        <Account path="/account" />
        <Dashboard default />
      </Router>
    </Layout>
  )
}
export default App
