import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { sizes } from "../helpers";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  usePageViews();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          breakpoints: { ...sizes, xxxl: 1900 },
        }}
      >
        <NotificationsProvider position="bottom-center" zIndex={2077}>
          <GoogleAnalytics
            gaMeasurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}
          />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
