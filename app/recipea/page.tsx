import { Suspense } from 'react';

import NavBar from '@/app/components/NavBar';
import { WAStyleStack } from '../components/webawesome';
import Results from './components/results'

export default function Page() {
  return (
    <>
      <title>Recipes</title>
      <meta name="description" content="Find recipes" />
      <NavBar />
      <main>
        <WAStyleStack>
          <Suspense>
            <Results />
          </Suspense>
        </WAStyleStack>
      </main >
    </>
  );
}