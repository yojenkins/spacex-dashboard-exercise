import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useApollo } from "../graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <main>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
export default MyApp;
