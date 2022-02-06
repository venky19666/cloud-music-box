import { useRouter } from 'next/router';
import React from 'react'
import { AuthContext } from './Auth'

export const checkIsNotAuth = function(){
  const auth = React.useContext(AuthContext);
  const router = useRouter();
  if(auth.access_token==='')
    router.push('/login');
  return;
}

export const checkAuthIsAuth = function(){
  const auth = React.useContext(AuthContext);
  const router = useRouter();
  if (auth.access_token !== '')
    router.push('/');
  return;
}
