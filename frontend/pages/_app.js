import * as React from "react";
import App from "next/app";
import Router from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import withApolloClient from "../lib/with-apollo-client";
import './app.css'

import { googlePageview } from "../components/GoogleAnalytics";

Router.events.on("routeChangeComplete", path => googlePageview(path));

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} query={router.query} />
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
