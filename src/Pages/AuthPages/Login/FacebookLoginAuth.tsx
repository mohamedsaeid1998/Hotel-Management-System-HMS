/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
const FacebookLoginAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  console.log(accessToken);
  const handleFacebookLogin = (response) => {
    console.log(response);
    setAccessToken(response.accessToken);

    axios
      .post(
        `http://154.41.228.234:3000/portal/users/auth/facebook`,
        accessToken
      )
      .then((response) => {
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  useEffect(() => {
    handleFacebookLogin;
  }, []);
  return (
    <>
      {" "}
      <FacebookLogin
        appId="1503450150434613"
        autoLoad={false}
        fields="name,email"
        callback={handleFacebookLogin}
        buttonText="Login with Facebook"
        cssClass="facebook-login-button"
        icon="fa-facebook-square"
      />
    </>
  );
};

export default FacebookLoginAuth;
