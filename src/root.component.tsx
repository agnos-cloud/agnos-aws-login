import Amplify from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsconfig from "./aws-exports.js";

Amplify.configure(awsconfig);

function Root({ signOut, user }) {
  console.log(user)
  return (<section>
    <h1>Hello {user.username}</h1>
    <button onClick={signOut}>Sign out</button>
  </section>);
}

export default withAuthenticator(Root);
