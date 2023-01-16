import { getSession } from "next-auth/react";

import AccountForm from "../../components/Account/AccountForm";
import AccountProfile from "../../components/Account/AccountProfile";

export default function Account(props) {
  const { user } = props;

  if (user) {
    return <AccountProfile user={user} />;
  }

  return <AccountForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: {
        user: session.user,
      },
    };
  }

  return {
    props: { user: null },
  };
}
