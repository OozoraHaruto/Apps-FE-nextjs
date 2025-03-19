import { goTimeToMonthYear } from '@/lib/helpers/time';
import style from '../page.module.css';
import { getCloudinaryIconLink } from './lib/helper';
import { getSchools } from './lib/school';

export default async function Page() {
  const [ schools ] = await Promise.all([ getSchools() ])

  return (
    <div className='wa-stack wa-gap-2xl"'>
      {
        schools.map((sch, i) => (
          <div key={ `schools-${i}` }>
            <div className={ "wa-flank:start wa-align-items-start" }>
              <img src={ getCloudinaryIconLink(sch.logo) } className={ style.iconRowHeaderIcon } />
              <div>
                <h4 className={ style.iconRowHeaderText }>{ sch.name }</h4>
                { goTimeToMonthYear(sch.from) } - { goTimeToMonthYear(sch.to) }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}