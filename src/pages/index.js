import * as React from "react"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Hero />
  </Layout>
)

export default IndexPage
