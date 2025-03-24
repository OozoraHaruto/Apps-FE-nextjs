import { Suspense } from 'react';

import NavBar from '@/app/components/NavBar';
import AppsView from './components/page';

export default function HarutoWrapper() {
  return (
    <>
      <title>Haruto's Apps</title>
      <NavBar />
      <main>
        <Suspense>
          <AppsView />
        </Suspense>
      </main >
    </>
  );
}