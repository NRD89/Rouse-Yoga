import React, { useContext } from "react"
import { Link } from "gatsby"
import { AuthContext } from "../hooks/useAuth"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const { isAuthenticated } = useContext(AuthContext)
  
  return (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    {isAuthenticated ? <Link to="/app">Dashboard</Link> : null}
  </Layout>
)}

export default IndexPage
