import { Suspense } from 'react';

import NavBar from '@/app/components/NavBar';
import Certifications from './components/certification';
import JobTitle from './components/jobTitle';
import Languages from './components/language';
import Projects from './components/project';
import Schools from './components/school';
import Skills from './components/skills';
import Work from './components/work';
import Header from './componentSubHeader';
import style from './page.module.css';

const description = "I'm an experienced Software Test Engineer with 4+ years of expertise in mobile and web automation, backend development, and quality assurance. Proven track record of designing and implementing robust automation frameworks, improving testing efficiency, and delivering high-quality software solutions. Skilled in Appium-like frameworks, JavaScript Bridge (JSB) automation, data-driven testing, and API automation. Adept at creating tools, dashboards, and reports to streamline team workflows and enhance productivity. Strong background in iOS/Android testing, backend development, and cross-functional collaboration."

export default function ProfileWrapper() {
  return (
    <>
      <title>Malcolm's Portfolio</title>
      <meta name="description" content={ description } />
      <NavBar />
      <main id={ style.portfolioMainDiv }>
        <div className='wa-stack wa-gap-2xl'>
          <div id={ style.portfolioFistDiv }>
            <div>
              <h3>Hi,</h3>
              <h1>I&apos;m Malcolm</h1>
              <JobTitle />
            </div>
            <div id={ style.portfolioExternalLinks }>
              <a href="https://github.com/OozoraHaruto" target='_blank'>
                <wa-icon-button name="github" family="brands"></wa-icon-button>
              </a>
              <a href="https://www.linkedin.com/in/malcolmchew/" target='_blank'>
                <wa-icon-button name="linkedin" family="brands"></wa-icon-button>
              </a>
              <a href="mailto:malcolmchew1993@gmail.com" target='_blank'>
                <wa-icon-button name="envelope" variant="solid"></wa-icon-button>
              </a>
              <a href="tel:96480438" target='_blank'>
                <wa-icon-button id="portfolio-link-phone" name="phone" variant="solid"></wa-icon-button>
                <wa-tooltip for="portfolio-link-phone" placement="bottom" hoist>Please drop me a text before calling</wa-tooltip>
              </a>
              <a href="https://drive.google.com/file/d/1CY5BdVI3h0F7TpDhhwn_u55QImFMctBg/view?usp=sharing" target='_blank'>
                <wa-icon-button id="portfolio-link-resume" name="file" variant="solid"></wa-icon-button>
                <wa-tooltip for="portfolio-link-resume" placement="bottom" hoist>View my resume</wa-tooltip>
              </a>
            </div>
          </div>
          <div className={ style.pageSectionMaxSizeContainer }>
            <div className={ style.pageSectionMaxSize }>
              { description }
            </div>
          </div>
          <div className={ style.pageSectionMaxSizeContainer }>
            <div className={ style.pageSectionMaxSize }>
              <div className="wa-grid" style={ { "--min-column-size": "333px" } }>
                {/* <Suspense fallback={ <Loading /> }> */ }
                <div className='wa-span-grid'>
                  <Header icon="briefcase" title="Work" />
                  <Suspense>
                    <Work />
                  </Suspense>
                </div>
                <div>
                  <Header icon="diagram-project" title="Projects" />
                  <Suspense>
                    <Projects />
                  </Suspense>
                </div>
                <div>
                  <Header icon="desktop" title="Skills" />
                  <Suspense>
                    <Skills />
                  </Suspense>
                </div>
                <div>
                  <Header icon="graduation-cap" title="Education" />
                  <Suspense>
                    <Schools />
                  </Suspense>
                </div>
                <div>
                  <Header icon="certificate" title="Certifications" />
                  <Suspense>
                    <Certifications />
                  </Suspense>
                </div>
                <div>
                  <Header icon="language" title="Languages" />
                  <Suspense>
                    <Languages />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </>
  );
}