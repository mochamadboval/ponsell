import Head from "next/head";

import { Fragment, useRef, useState } from "react";

import FormInput from "../../components/UI/FormInput";

export default function Account() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const [invalidMessage, setInvalidMessage] = useState();
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);

  const switchFormHandler = () => {
    setIsLoginForm((prevState) => !prevState);
  };

  const createNewUserHandler = async (event) => {
    event.preventDefault();

    setIsInvalidInput(false);

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const data = await response.json();

    if (!data.userId) {
      setIsInvalidInput(true);
      setInvalidMessage(data.message);
    }
  };

  const loginHandler = (event) => {
    event.preventDefault();

    setIsInvalidInput(false);

    console.log("OK");
  };

  return (
    <Fragment>
      <Head>
        <title>{`${isLoginForm ? "Login" : "Sign Up"} - Ponsell`}</title>
        <meta
          name="description"
          content={`${isLoginForm ? "Login" : "Sign Up"} to Ponsell`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-sm mx-auto px-4 py-5">
        <article className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="font-bold text-base text-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {isInvalidInput && (
            <p className="bg-red-200 mt-4 p-2 rounded-md text-center">
              {invalidMessage}
            </p>
          )}
          <form
            className="flex flex-col gap-2 pt-4"
            onSubmit={isLoginForm ? loginHandler : createNewUserHandler}
          >
            <FormInput label="email" name="Email" type="email" ref={emailRef} />
            <FormInput
              label="password"
              name="Password"
              type="password"
              ref={passwordRef}
            />
            {!isLoginForm && (
              <FormInput label="name" name="Name" type="text" ref={nameRef} />
            )}
            <button className="bg-green-700 mt-2 py-3 rounded-md shadow-sm text-white">
              {isLoginForm ? "Login" : "Create Account"}
            </button>
          </form>
          <p className="pt-2 text-center">or</p>
          <button
            className="border border-green-700 mt-2 py-3 rounded-md w-full"
            onClick={switchFormHandler}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </button>
        </article>
      </div>
    </Fragment>
  );
}
