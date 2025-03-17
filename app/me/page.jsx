import React, { Suspense } from 'react';

import NavBar from '@/app/components/NavBar';
import Profile from './components/profile'
import Loading from './loading'

export default function ProfileWrapper() {
  return (
    <>
      <NavBar />
      <Suspense fallback={ <Loading /> }>
        <Profile />
      </Suspense>
    </>
  );
}