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

      <div className="max-w-screen-sm mx-auto px-4 py-5">
        <article className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg">
            Hi, <span className="font-semibold">{username}</span>
          </h2>
          <p className="text-neutral-500">{user.email}</p>
          <button
            className="bg-red-700 mt-4 py-3 rounded-md shadow-sm text-white w-full"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </article>
      </div>
    </Fragment>
  );
}
