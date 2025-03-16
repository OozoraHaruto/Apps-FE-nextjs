"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import NavBar from '../../components/NavBar';
import { login } from '@/lib/auth';

export const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const [ password, setPassword ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const checkPassword = () => {
    const pass = document.getElementById("password")
    setLoading(true);
    login(username, password).then((response) => {
      setLoading(false);
      if (response === true) {
        pass.setCustomValidity("");
        const redirect = searchParams.get('redirect')
        router.push(redirect || '/');
      }
    }).catch((error) => {
      setLoading(false);
      pass.setCustomValidity(error.message);
    });
  };

  useEffect(() => {
    document.getElementById("username").addEventListener('input', e => {
      setUsername(e.target.value)
    });
    document.getElementById("password").addEventListener('input', e => {
      setPassword(e.target.value)
    });
  }, []);


  return (
    <>
      <title>Login</title>
      <meta name="description" content="Login to Haruto Apps" />
      <NavBar />
      <main className="centerbox">
        <wa-card>
          <form className="input-validation-type input-validation-custom" onSubmit={(event) => {
            event.preventDefault();
            checkPassword();
          }}>
            <wa-input id="username" label="Username/E-mail" autofocus value={username} required></wa-input>
            <br />
            <wa-input type="password" id="password" label="Password" passwordToggle value={password} required></wa-input>
            <br />
            <wa-button type="submit" variant="brand" loading={loading}>Submit</wa-button>
            <wa-button type="reset" variant="neutral" loading={loading}>Reset</wa-button>
          </form>
        </wa-card>
      </main>
    </>
  );
}


export default Login;