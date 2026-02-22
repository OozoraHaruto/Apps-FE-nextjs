'use client';

import { useEffect, useState } from 'react';

import { getProfileData } from '@/lib/auth';
import styles from './index.module.css';
import NavBarDropDownContainer from './NavBarDropDown';
import { NavBarDropDownLink, NavBarLink } from './NavBarLink';

export const NavBar = ({ showLogin = false }) => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    getProfileData().then((profile) => {
      setUser(profile);
      console.log(profile)
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
        <NavBarDropDownContainer title="Tools" prefix="/tools/" icon="screwdriver-wrench">
          <NavBarDropDownLink title="Password Generator" to="/tools/password-generator" icon="key" />
          <NavBarDropDownLink title="JSON Encoder/Decoder" to="/tools/json-helper" icon="file-lines" />
        </NavBarDropDownContainer>
        {
          user && <NavBarDropDownContainer title="Recipea" prefix="/recipea" icon="kitchen-set">
            <NavBarDropDownLink title="View" to="/recipea" icon="grip" />
            <NavBarDropDownLink title="Add" to="/recipea/add" icon="file-circle-plus" />
          </NavBarDropDownContainer>
        }

        { user && (user.allowed.includes("haruto/*") || user.allowed.includes("haruto/appsOfficial")) && (<NavBarLink title="はると" to="/haruto" icon="face-dizzy" />) }
      </div>
      <div className="wa-cluster wa-gap-l">
        { showLogin === true && !user && (
          <NavBarLink title="Login" to="/auth/login" icon="right-to-bracket" />
        ) }
        {
          user && (
            <wa-dropdown>
              <wa-button slot="trigger" appearance="plain" size="small" variant="brand" caret>
                <wa-avatar
                  image={ user.icon }
                  label="User's avatar"
                  loading="lazy"
                  slot="start"
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