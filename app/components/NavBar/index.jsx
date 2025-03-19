'use client';

import { useEffect, useState } from 'react';

import { getProfileData } from '@/lib/auth';
import styles from './index.module.css';
import { NavBarDropDownLink, NavBarLink } from './NavBarLink';

export const NavBar = (showLogin = false) => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    getProfileData().then((profile) => {
      setUser(profile);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <header slot="header" className="wa-split">
      <div className="wa-cluster wa-gap-xs wa-align-items-center">
        {/* <wa-icon name="feather-pointed" style={ { color: "var(--wa-color-brand-fill-loud)" } }></wa-icon> */ }
        {/* <span id="brand-name" className="wa-heading-s wa-desktop-only">Audubon Worldwide</span> */ }
        <NavBarLink title="Home" to="/" icon="home" />
        <NavBarLink title="Portfolio" to="/portfolio" icon="briefcase" />
        { user && (<NavBarLink title="Me" to="/me" icon="face-smile" />) }
      </div>
      <div className="wa-cluster wa-gap-l">
        { showLogin === true && user && (
          <NavBarLink title="Login" to="/auth/login" icon="right-to-bracket" />
        ) }
        {
          user && (
            <wa-dropdown>
              <wa-button slot="trigger" size="small" caret>
                <wa-avatar
                  image={ user.icon }
                  label="User's avatar"
                  loading="lazy"
                  slot="prefix"
                  id={ styles.navUserAvatar }
                ></wa-avatar>
                <span>{ user.name }</span>
              </wa-button>
              <wa-menu>
                <NavBarDropDownLink title="Me" to="/me" icon="face-smile" />
                <wa-divider></wa-divider>
                <NavBarDropDownLink title="Logout" to="/auth/logout" icon="right-from-bracket" />
              </wa-menu>
            </wa-dropdown>
          )
        }
      </div>
    </header>
  );
}

export default NavBar;