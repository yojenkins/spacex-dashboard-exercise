import { useCallback } from "react";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useApollo } from "../graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const toggleMode = useCallback(() => {
    document.documentElement.classList.toggle("dark");
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <main>
        <button onClick={toggleMode}>Dark Mode</button>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
export default MyApp;
