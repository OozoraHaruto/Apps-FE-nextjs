"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { clearAuthStorage } from '@/lib/auth';

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    clearAuthStorage();
    router.push('/');
  }, []);

  return (
    <main className="centerbox">
      <title>Logout</title>
      <meta name="description" content="Logout from Haruto Apps" />
      <h2>Logging out...</h2>
    </main>
  );
}