"use client"

import { useState } from 'react';

const imageLink = (uri) => {
  return `https://res.cloudinary.com/duxmjjxns/image/upload/t_haruto_apps_thumbnail/${uri}`
}

const LinksView = ({ ownKey, links }) => (
  <>
    {
      links.map((link, i) => (
        (link.name === "hr") ? <hr key={ `${ownKey}-${i}` } /> :
          <a key={ `${ownKey}-${i}` } href={ link.url }>
            <wa-button
              variant={ link.color === "" ? "brand" : link.color }
              className="fullWidthButton"
            >{ link.name }</wa-button>
          </a>
      ))
    }
  </ >
)

export default function AppCard({ ownKey, app }) {
  const [ seeMore, setSeeMore ] = useState(false)

  return (
    <wa-card with-image className="card-overview">
      <img
        slot="image"
        src={ imageLink(app.image) }
      />

      <strong>{ app.name }</strong><br />
      <div className="wa-stack" >
        { app.links && <LinksView ownKey={ `${ownKey}-links` } links={ app.links } /> }
        {
          app.hiddenLinks && <div className="SeeMoreContainer">
            <wa-divider></wa-divider>
            <wa-button variant="brand" size="small" appearance="plain" onClick={ () => { setSeeMore(!seeMore) } }>
              { seeMore ? "Hide" : "See more" }
            </wa-button>
            <wa-divider></wa-divider>
          </div>
        }
        { app.hiddenLinks && seeMore &&
          <LinksView ownKey={ `${ownKey}-hidden-links` } links={ app.hiddenLinks } />
        }
      </div>
    </wa-card>
  )
}