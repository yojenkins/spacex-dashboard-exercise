import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState(false);
  const toggleMode = () => setMode((m) => !m);
  return (
    <div className={`${mode ? "dark" : ""} h-full`}>
      <main className="bg-gray-50 dark:bg-gray-800 h-full">
        <button onClick={toggleMode}>Dark Mode</button>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
