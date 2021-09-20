import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import "./Hero.css"

const Hero = () => {
  const { backgroundimage123 } = useStaticQuery(
    graphql`
      query {
        backgroundimage123: file(
          relativePath: { eq: "cameleon-2000-medium.jpg" }
        ) {
          childImageSharp {
            gatsbyImageData(
              width: 2000
              quality: 50
              webpOptions: { quality: 70 }
            )
          }
        }
      }
    `
  )

  const pluginImage = getImage(backgroundimage123)

  return (
    <>
      <BgImage image={pluginImage} className="bg">
        <div className="overlay"></div>{" "}
        <div className="heading-wrapper">
          {" "}
          <h1 className="heading">cameleon</h1>
        </div>
      </BgImage>
    </>
  )
}

export default Hero
