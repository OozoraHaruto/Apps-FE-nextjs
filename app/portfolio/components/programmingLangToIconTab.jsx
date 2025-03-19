import style from '../page.module.css';
import { getCodeLogo } from './lib/helper';


export default function Tab({ lang, title, variant = "brand", appearance = "filled" }) {
  const icon = getCodeLogo(lang)

  return (
    <wa-tag variant={ variant } appearance={ appearance }>
      {
        icon && (
          <wa-icon fixed-width name={ icon } className={ style.tagWithIcon } family="brands"></wa-icon>
        )
      }
      { title }
    </wa-tag>
  )
}