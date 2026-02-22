'use client';

import { usePathname } from 'next/navigation';



export const Wrapper = ({ title, prefix, children, icon }) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(prefix);

  return (
    <wa-dropdown>
      <wa-button
        appearance={ isActive ? 'filled' : 'plain' }
        variant={ isActive ? 'brand' : 'neutral' }
        slot="trigger"
        size="small"
        caret
      >
        { icon && <wa-icon slot="start" name={ icon } variant="solid"></wa-icon> }
        { title }
      </wa-button>
      <>
        { children }
      </>
    </wa-dropdown>
  )
};

export default Wrapper;