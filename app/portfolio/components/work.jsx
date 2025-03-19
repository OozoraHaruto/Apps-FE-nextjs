import { goTimeToMonthYear } from '@/lib/helpers/time';
import style from '../page.module.css';
import { getCloudinaryIconLink } from './lib/helper';
import { getWork } from './lib/work';
import ProgLangToIconTab from './programmingLangToIconTab';

export default async function Page() {
  const [ jobs ] = await Promise.all([ getWork() ])

  return (
    <div className='wa-stack wa-gap-2xl"'>
      {
        jobs ? jobs.map((job, i) => (
          <div key={ `jobs-${i}` }>
            <div className={ "wa-flank:start wa-align-items-start " + style.iconRow }>
              {
                job.logo &&
                <img src={ getCloudinaryIconLink(job.logo) } className={ style.iconRowHeaderIcon } />
              }
              <div>
                <h4 className={ style.iconRowHeaderText }>{ job.company }</h4>
                <div>{ job.title }</div>
                <div>{ goTimeToMonthYear(job.from) } - { goTimeToMonthYear(job.to) }</div>
              </div>
            </div>
            <div className='wa-cluster'>
              {
                job.programming.map((lang, j) => (
                  <ProgLangToIconTab key={ `jobs-${i}-lang-${j}` } lang={ lang } title={ lang } />
                ))
              }
            </div>
            <div>{ job.summary }</div>
            <wa-details summary="See full job details" id={ style.workDetails }>
              <ul>
                {
                  Object.keys(job.details).map((k, j) => {
                    const val = job.details[ k ]
                    return (
                      <>
                        <li key={ `jobs-${i}-details-${j}` }>{ k }</li>
                        {
                          val.length > 0 && <ul>
                            {
                              val.map((v, z) => (
                                <li key={ `jobs-${i}-details-${j}-${z}` }>{ v }</li>
                              ))
                            }
                          </ul>
                        }
                      </>
                    )
                  })
                }
              </ul>
            </wa-details>
          </div>
        )) : <h2>Failed to load jobs</h2>
      }
    </div>
  );
}