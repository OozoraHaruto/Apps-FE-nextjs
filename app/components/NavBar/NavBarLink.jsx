'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';


export const NavBarLink = ({ title, to, icon }) => {
  const pathname = usePathname()
  const isActive = pathname === to;

  return (
    <Link href={ to } style={ { textDecoration: 'None' } }>
      <wa-button
        size="small"
        appearance={ isActive ? 'filled' : 'plain' }
        variant={ isActive ? 'brand' : 'neutral' }
      >
        { icon && <wa-icon slot="prefix" name={ icon } variant="solid"></wa-icon> }
        { title }
      </wa-button>
    </Link>
  )
};

export const NavBarDropDownLink = ({ title, to, icon }) => {
  const pathname = usePathname()
  const isActive = pathname === to;

  return (
    <Link href={ to } style={ { textDecoration: 'None' } }>
      <wa-menu-item>
        { icon && <wa-icon slot="prefix" name={ icon } variant="solid"></wa-icon> }
        { title }
      </wa-menu-item>
    </Link>
  )
};
