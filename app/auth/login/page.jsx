"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import NavBar from '@/app/components/NavBar';
import { WAButton, WACard, WAInput, WAStyleStack } from '@/app/components/webawesome';
import { login } from '@/lib/auth';
import { getSearchParams } from '@/lib/helpers';

export default function Login() {
  const router = useRouter();

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
        const redirect = getSearchParams('redirect')
        router.push(redirect || '/');
      }
    }).catch((error) => {
      setLoading(false);
      pass.setCustomValidity(error.message);
    });
  };

  return (
    <>
      <title>Login</title>
      <meta name="description" content="Login to Haruto Apps" />
      <NavBar />
      <main className="centerbox">
        <WACard>
          <form className="input-validation-type input-validation-custom" onSubmit={ (event) => {
            event.preventDefault();
            checkPassword();
          } }>
            <WAStyleStack>
              <WAInput id="username" label="Username/E-mail" value={ username } onChange={ setUsername } autofocus required />
              <WAInput type="password" id="password" label="Password" value={ password } onChange={ setPassword } required />
              <WAButton type="submit" variant="brand" loading={ loading }>Submit</WAButton>
              <WAButton type="reset" variant="neutral" loading={ loading }>Reset</WAButton>
            </WAStyleStack>
          </form>
        </WACard>
      </main >
    </>
  );
}