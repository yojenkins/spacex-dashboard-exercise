import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useApollo } from "../graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState(false);
  const apolloClient = useApollo(pageProps.initialApolloState);
  const toggleMode = () => setMode((m) => !m);
  return (
    <ApolloProvider client={apolloClient}>
      <div className={`${mode ? "dark" : ""} h-full`}>
        <main className="bg-gray-50 dark:bg-gray-800 h-full">
          <button onClick={toggleMode}>Dark Mode</button>
          <Component {...pageProps} />
        </main>
      </div>
    </ApolloProvider>
  );
}
export default MyApp;
