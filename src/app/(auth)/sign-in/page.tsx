// import React from 'react'
//  function Component(){
//     return (
//       <>
//       Signed in as {session.user.email}
//       <button onClick={()=>signOut()}>Sign out</button></>
//     )
// }
// return (
//     <>
//     Not signed in yet
//     <button  className:bg-orange-500px-3 py-2 onClick={()=>signIn()}>Sign in</button></>
// )
'use client'
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Component = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in yet
      <button
        className="bg-orange-500 px-3 py-2"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
};

export default Component;