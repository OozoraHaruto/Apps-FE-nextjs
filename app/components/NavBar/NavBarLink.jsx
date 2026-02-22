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
        { icon && <wa-icon slot="start" name={ icon }></wa-icon> }
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
      <wa-dropdown-item>
        { icon && <wa-icon slot="icon" name={ icon }></wa-icon> }
        { title }
      </wa-dropdown-item>
    </Link>
  )
};
