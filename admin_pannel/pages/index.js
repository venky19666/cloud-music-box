import { useRouter } from 'next/router';
import React from 'react';
import { AuthContext } from '../hooks/Auth';
import { checkIsNotAuth } from "../hooks/authentication";

function index() {
  const auth = React.useContext(AuthContext);
  const router = useRouter();
  React.useEffect(()=>{
    if(auth.token==="")
      router.push("/login");
  },[auth]);
  return (
    <div>
      Under development
    </div>
  )
}

export default index
