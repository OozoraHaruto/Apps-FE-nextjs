import style from '../page.module.css';
import { getLanguages } from './lib/language';

export default async function Page() {
  const [ languages ] = await Promise.all([ getLanguages() ])

  return (
    <div className='wa-stack wa-gap-2xl"'>
      {
        languages ? languages.map((lang, i) => (
          <div key={ `language-${i}` }>
            <h5 className={ style.iconRowHeaderText }>{ lang.name }</h5>
            <div className="wa-cluster">
              <wa-tag variant="brand" appearance="filled">
                <wa-icon fixed-width name="ear-listen" className={ style.tagWithIcon }></wa-icon>
                Listen: { lang.listen }
              </wa-tag>

              <wa-tag variant="brand" appearance="filled">
                <wa-icon fixed-width name="microphone-lines" className={ style.tagWithIcon }></wa-icon>
                Speak: { lang.speak }
              </wa-tag>

              <wa-tag variant="brand" appearance="filled">
                <wa-icon fixed-width name="pen" className={ style.tagWithIcon }></wa-icon>
                Write: { lang.write }
              </wa-tag>
            </div>
          </div>
        )) : <div>failed to load languages</div>
      }
    </div>
  );
}