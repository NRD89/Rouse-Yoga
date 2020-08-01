import React from "react"
import { Link } from "gatsby"
import Register from '../components/Register'

import Layout from "../components/layout"

const RegisterPage = ({ location }) => {
  console.log(location);
  const { state: routeState } = location
  const redirect = !routeState
    ? '/app'
    : routeState.redirect === 'app'
      ? '/app'
      : `/app/${routeState.redirect}`
  
  return (
    <Layout>
      <h1>Sign Up</h1>
      <div>
        <Register redirect={redirect} />
      </div>
      <Link to="/">Go to Home Page</Link>
    </Layout>
  )
}

export default RegisterPage