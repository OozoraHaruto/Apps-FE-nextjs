'use client'

import { useEffect, useState } from 'react';


import style from '../page.module.css';
import { getCloudinaryIconLink } from './lib/helper';
import { getProjectsWithCache } from './lib/project';
import ProgLangToIconTab from './programmingLangToIconTab';

const getLinkIcon = (label) => {
  if (label.startsWith("GitHub")) {
    return "github"
  } else if (label === "iOS") {
    return "apple"
  }
}

const getLinkLink = (label, url) => {
  if (label.startsWith("GitHub")) {
    return "https://github.com/OozoraHaruto/" + url
  }

  return url
}

export default function Page() {
  const [ projects, setProjects ] = useState(undefined);
  const [ projectShort, setProjectShort ] = useState(undefined);
  const [ seeMore, setSeeMore ] = useState(false)

  useEffect(() => {
    if (projects) {
      return
    }

    getProjectsWithCache().then((rsp) => {
      console.log("get projects responded", rsp)
      if (rsp) {
        setProjects(rsp)
        setProjectShort(rsp.slice(0, 2))
      }
    })
  }, []);


  return (
    <div className='wa-stack wa-gap-2xl"'>
      {
        projects && projectShort ? <div>
          {
            (seeMore ? projects : projectShort).map((proj, i) => (
              <div key={ `projects-${i}` }>
                <div className={ "wa-flank:start wa-align-items-start " + style.iconRow }>
                  {
                    proj.image &&
                    <wa-avatar image={ getCloudinaryIconLink(proj.image) } shape="rounded"></wa-avatar>
                  }
                  <div>
                    <h4 className={ style.iconRowHeaderText }>{ proj.name }</h4>
                    <div className='wa-cluster'>
                      {
                        proj.links.map((link, j) => (
                          <a href={ getLinkLink(link.name, link.url) } target='_blank' key={ `projects-${i}-links-${j}` }>
                            <wa-icon-button name={ getLinkIcon(link.name) } family="brands" id={ `projects-${i}-links--${j}` }></wa-icon-button>
                            <wa-tooltip for={ `projects-${i}-links--${j}` }>{ link.name }</wa-tooltip>
                          </a>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='wa-cluster'>
                  {
                    proj.languages.map((lang, j) => (
                      <ProgLangToIconTab key={ `projects-${i}-lang-${j}` } lang={ lang } title={ lang } />
                    ))
                  }
                </div>
                <div>{ proj.description }</div>
              </div>
            ))
          }
          <div className={ style.SeeMoreContainer }>
            <wa-divider></wa-divider>
            <wa-button variant="brand" size="small" appearance="plain" onClick={ () => { setSeeMore(!seeMore) } }>
              { seeMore ? "Hide" : "See more" }
            </wa-button>
            <wa-divider></wa-divider>
          </div>
        </div> : <h2>Failed to load projects</h2>
      }
    </div>
  );
}