import { useEffect } from "react";

import Amplify from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsconfig from "./aws-exports.js";

import { UsersLocalStorage } from "./data/local";

Amplify.configure(awsconfig);

const usersLocalStorage = new UsersLocalStorage();

function Root({ signOut, user }) {
  useEffect(() => {
    if (!user) return;

    usersLocalStorage.save({
      id: "current_user",
      user: {
        attributes: user.attributes,
      },
    });
}, [user]);

  return (<section>
    <h1>Hello {user.attributes.email}</h1>
    <p>Links: Designs | Teams | Settings</p>
    <button onClick={(e) => {
      if (!user) return;

      usersLocalStorage.delete("current_user");

      signOut(e);
    }}>Sign out</button>
  </section>);
}

export default withAuthenticator(Root);
