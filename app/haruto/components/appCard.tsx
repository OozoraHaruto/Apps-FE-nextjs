"use client"

import { useState } from 'react';

import { WAButton, WACard, WASeeMore, WAStyleStack } from '@/app/components/webawesome';
import { HomeApp, HomeAppLink } from './lib/apps';

const imageLink = (uri: string) => {
  return `https://res.cloudinary.com/duxmjjxns/image/upload/t_haruto_apps_thumbnail/${uri}`
}

const LinksView = ({ ownKey, links }: { ownKey: string; links: HomeAppLink[] }) => (
  <>
    {
      links.map((link, i) => (
        (link.name === "hr") ? <hr key={ `${ownKey}-${i}` } /> :
          <WAButton
            key={ `${ownKey}-${i}` }
            href={ link.url }
            appearance="accent"
            variant={ link.color === "" ? "brand" : link.color }
          >{ link.name }</WAButton>
      ))
    }
  </ >
)

export default function AppCard({ ownKey, app }: { ownKey: string; app: HomeApp }) {
  const [ seeMore, setSeeMore ] = useState(false)

  return (
    <WACard withImage overview>
      <img
        slot="image"
        src={ imageLink(app.image) }
      />

      <strong>{ app.name }</strong><br />
      <WAStyleStack>
        { app.links && <LinksView ownKey={ `${ownKey}-links` } links={ app.links } /> }
        { app.hiddenLinks && <WASeeMore seeMore={ seeMore } setSeeMore={ setSeeMore } /> }
        { app.hiddenLinks && seeMore &&
          <LinksView ownKey={ `${ownKey}-hidden-links` } links={ app.hiddenLinks } />
        }
      </WAStyleStack>
    </WACard>
  )
}