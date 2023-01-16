import Head from "next/head";
import { signOut } from "next-auth/react";

import { Fragment } from "react";

export default function AccountProfile(props) {
  const { user } = props;

  const username = user.name;

  const logoutHandler = () => {
    signOut();
  };

  return (
    <Fragment>
      <Head>
        <title>{`${username} - Ponsell`}</title>
        <meta name="description" content={`${username} account on Ponsell`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Hello, {username}</p>
      <button onClick={logoutHandler}>Logout</button>
    </Fragment>
  );
}
