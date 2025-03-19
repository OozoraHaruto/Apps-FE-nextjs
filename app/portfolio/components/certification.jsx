import { goTimeToMonthYear } from '@/lib/helpers/time';
import style from '../page.module.css';
import { getCerts } from './lib/certificate';

export default async function Page() {
  const [ certs ] = await Promise.all([ getCerts() ])

  return (
    <div className='wa-stack wa-gap-2xl"'>
      {
        certs.map((cert, i) => (
          <div key={ `cert-${i}` }>
            <h4 className={ style.iconRowHeaderText }>{ cert.name }</h4>
            { goTimeToMonthYear(cert.date) }
          </div>
        ))
      }
    </div>
  );
}