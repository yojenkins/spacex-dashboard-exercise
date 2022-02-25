import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-50 dark:bg-gray-775 font-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
