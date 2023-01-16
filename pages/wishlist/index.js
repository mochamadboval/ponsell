import { getSession } from "next-auth/react";

export default function Wishlist(props) {
  console.log(props.user);

  return <p>Wishlist</p>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
