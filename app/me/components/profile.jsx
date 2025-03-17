import { getProfile } from '@/lib/authServer';
import Link from 'next/link';
import style from './profile.module.css';

export default async function Profile() {
  const profileData = getProfile()
  const [ profile ] = await Promise.all([ profileData ])

  return (
    <>
      <title>{ profile.name }</title>
      <meta name="description" content={ `${profile.name}'s profile on Haruto Apps` } />
      <main className="justifyCenter">
        <div className='wa-stack'>
          <div className='justifyCenter'>
            <wa-avatar
              image={ profile.icon }
              label="Avatar of a white and grey kitten on grey textile"
              loading="lazy"
              id={ style.profileViewUserAvatar }
            ></wa-avatar>
          </div>
          <div className='justifyCenter'>
            <h1>{ profile.name }</h1>
          </div>
          <div>
            <wa-card with-header with-footer class="card-header card-footer">
              <div slot="header">
                User Info
              </div>

              User ID: { profile.id }

              <div slot="footer" className='justifyEnd'>
                <Link href="/auth/logout">
                  <wa-button variant="danger" appearance="outlined">
                    <wa-icon slot="prefix" name="right-from-bracket" variant="solid"></wa-icon>
                    Logout
                  </wa-button>
                </Link>
              </div>
            </wa-card>
          </div>
        </div>
      </main>
    </>
  );
}