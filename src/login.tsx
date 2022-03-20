import { useEffect } from "react";
import { withRouter } from "react-router";
import { useHistory  } from "react-router-dom";
import queryString from "query-string";

import Amplify from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// import awsconfig from "./aws-exports.js";

import { UsersLocalStorage } from "./data/local";

const awsconfig = {
  "aws_project_region": "us-east-1",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_g7ayvREtO",
  "aws_user_pools_web_client_id": "4lriu7mrrt8e5l6c41be6me82i",
  "oauth": {},
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};

Amplify.configure(awsconfig);

const usersLocalStorage = new UsersLocalStorage();

function Login({ signOut, user, location }) {
  const history = useHistory();
  useEffect(() => {
    if (!user) return;

    usersLocalStorage.save({
      id: "current_user",
      user: {
        attributes: user.attributes,
      },
    });

    const queries = queryString.parse(location.search)

    // redirect
    if (queries.return_url) {
        history.push(queries.return_url);
    }

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

export default withRouter(withAuthenticator(Login));
