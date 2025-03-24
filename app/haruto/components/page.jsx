import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { COOKIE_NAME, validateJWT } from '@/lib/auth';
import Apps from './app';
import AppsOfficial from './appOfficial';
import Productkeys from './productKey';

export default async function Haruto() {
  const jwt = (await cookies()).get(COOKIE_NAME)?.value
  const [ success, allowed ] = await validateJWT(jwt)

  const isMe = allowed.includes("haruto/*")
  const isAllowed = isMe || allowed.includes("haruto/appsOfficial")

  return (
    <div className='pageSectionMaxSizeContainer'>
      <div className='pageSectionMaxSize'>
        {
          isAllowed ? <div className="details-group-example">
            {
              isMe && <Suspense>
                <wa-details summary="アプリ" open>
                  <Apps />
                </wa-details>
              </Suspense>
            }

            <Suspense>
              <wa-details summary="他のアプリ">
                <AppsOfficial />
              </wa-details>
            </Suspense>

            {
              isMe && <Suspense>
                <wa-details summary="Product keys">
                  <Productkeys />
                </wa-details>
              </Suspense>
            }
          </div> : <div>Failed to load profile</div>
        }
      </div>
    </div>
  );
}