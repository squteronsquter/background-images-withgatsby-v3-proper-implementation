# Proper steps to implement background images in gatsby v3

## get started eg. with the default starter (Astronaut)

`npx gatsby new {project-name} https://github.com/gatsbyjs/gatsby-starter-default`

## The above wil give you plugin for static images

## install gatsby-background-image and gbimage-bridge

`npm install --save gatsby-background-image`

`npm install --save gbimage-bridge`

## Install other plugins (example package.json file):

```
{
  "name": "gatsby-starter-hello-world",
  "private": true,
  "description": "A simplified bare-bones starter for Gatsby",
  "version": "0.1.0",
  "license": "0BSD",
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "start": "gatsby develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  },
  "dependencies": {
    "babel-plugin-styled-components": "^1.13.2",
    "gatsby": "^3.13.1",
    "gatsby-background-image": "^1.5.3",
    "gatsby-plugin-image": "^1.14.0",
    "gatsby-plugin-sass": "^4.14.0",
    "gatsby-plugin-sharp": "^3.14.0",
    "gatsby-plugin-styled-components": "^4.14.0",
    "gatsby-source-filesystem": "^3.14.0",
    "gatsby-transformer-sharp": "^3.14.0",
    "gbimage-bridge": "^0.1.4",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-icons": "^4.2.0",
    "sass": "^1.41.1",
    "styled-components": "^5.3.1"
  },
  "devDependencies": {
    "prettier": "2.3.2"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/gatsbyjs/gatsby-starter-hello-world"
  },
  "bugs": {
    "url": "https://github.com/gatsbyjs/gatsby/issues"
  }
}
```

## `npm i`

## Configure the plugins:

## gatsby-config.js

```
const path = require(`path`)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
  ],
}

## or the config file from the default (Astronaut) starter

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
```

##

## GraphQL query part:

## Check the following in Explorer

```
   file
       relativePath
           eq: "cameleon-2000-medium.jpg"
       childImageSharp
           gatsbyImageData
               quality: 50
               webpOptions:
                   quality: 70
               width:2000
```

## The query is here:

```
query MyQuery {
  file(relativePath: {eq: "cameleon-2000-medium.jpg"}) {
    id
    childImageSharp {
      gatsbyImageData(
        width: 2000,
        quality: 50,
        webpOptions: {quality: 70}
      )
    }
  }
}

```

## You should see the following output of this query

```

{
  "data": {
    "file": {
      "id": "359cfc51-fc13-537d-9c1d-d52182a44619",
      "childImageSharp": {
        "gatsbyImageData": {
          "layout": "constrained",
          "backgroundColor": "#08a868",
          "images": {
            "fallback": {
              "src": "/static/1489e289939fc2061cce93e124c13736/54fe3/cameleon-2000-medium.jpg",
              "srcSet": "/static/1489e289939fc2061cce93e124c13736/4770b/cameleon-2000-medium.jpg 500w,\n/static/1489e289939fc2061cce93e124c13736/88b4e/cameleon-2000-medium.jpg 1000w,\n/static/1489e289939fc2061cce93e124c13736/54fe3/cameleon-2000-medium.jpg 2000w",
              "sizes": "(min-width: 2000px) 2000px, 100vw"
            },
            "sources": [
              {
                "srcSet": "/static/1489e289939fc2061cce93e124c13736/88c60/cameleon-2000-medium.webp 500w,\n/static/1489e289939fc2061cce93e124c13736/8f5be/cameleon-2000-medium.webp 1000w,\n/static/1489e289939fc2061cce93e124c13736/d65b9/cameleon-2000-medium.webp 2000w",
                "type": "image/webp",
                "sizes": "(min-width: 2000px) 2000px, 100vw"
              }
            ]
          },
          "width": 2000,
          "height": 1400
        }
      }
    }
  },
  "extensions": {}
}

```

##

Now the code inside a React/Gatsby Page or Component:

## eg. file name of the component:

## Bgimage.js

```

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

const GbiBridged = () => {
  const { backgroundimage123 } = useStaticQuery(
    graphql`
      query {
        backgroundimage123: file(relativePath: { eq: "cameleon-2000-medium.jpg" }) {
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
    <BgImage
      image={pluginImage}
      className="masthead"
      backgroundColor={`#2a2a2a`}
    >
      <h1>Hello from Dark Forest</h1>
    </BgImage>
  )
}

export default GbiBridged
```

## And that it can be imported in layout or in any other page like that:

```
import React from "react"
import styled from "styled-components"
import Navbar from "./Navbar"
// import Header from "./Header"
import Footer from "./Footer"
import Bgimage from "./Bgimage"

export const Layout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Bgimage />
        {children}
        <Footer />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section``

export default Layout
```

## That's it
