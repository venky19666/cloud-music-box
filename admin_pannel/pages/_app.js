import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../util/theme";
import Layout from "../layout/default";
import { AuthContext } from "../hooks/Auth";
import Router from "next/router";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [auth, setAuth] = React.useState({
    access_token: "",
    token: "",
    device_code: "",
  });
  const [loading, setLoading] = React.useState(false);

  const routerStart = function () {
    console.log("router start");
    setLoading(true);
    return;
  };
  const routerEnd = function () {
    console.log("router closed");
    setLoading(false);
    return;
  };

  const updateAuth = function (type, payload = null) {
    switch (type) {
      case "ALL":
        setAuth(function (prev, data = payload) {
          return {
            ...prev,
            access_token: data.access_token,
            token: data.token,
          };
        });
        return;
      case "ACCESS_TOKEN":
        setAuth(function (prev, data = payload) {
          return {
            ...prev,
            access_token: data,
          };
        });
        return;
      case "TOKEN":
        setAuth(function (prev, data = payload) {
          return {
            ...prev,
            token: data,
          };
        });
        return;
      case "DEVICE_CODE":
        setAuth(function (prev, data = payload) {
          return {
            ...prev,
            device_code: data,
          };
        });
        return;
      case "REMOVE":
        setAuth(function (prev) {
          return {
            ...prev,
            token: "",
            access_token: "",
          };
        });
        localStorage.setItem("user-cache", "");
        return;
      default:
        break;
    }
  };

  Router.events.on("routeChangeStart", routerStart.bind(this));
  Router.events.on("routeChangeComplete", routerEnd.bind(this));
  Router.events.on("routeChangeError", routerEnd.bind(this));

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (
      localStorage.getItem("user-cache") === null ||
      localStorage.getItem("user-cache") === undefined ||
      localStorage.getItem("user-cache") === ""
    ) {
      updateAuth(
        "DEVICE_CODE",
        JSON.stringify({
          uesr_agent: navigator.userAgent,
          platform: navigator.platform,
        })
      );
    } else {
      updateAuth("ALL", JSON.parse(localStorage.getItem("user-cache")));
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <AuthContext.Provider value={{ ...auth, updateAuth: updateAuth }}>
          <Layout loading={loading}>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
