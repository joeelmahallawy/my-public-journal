import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { sizes } from "../helpers";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import Script from "next/script";

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
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}`}
          ></Script>
          <Script>
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}');`}
          </Script>
          {/* <GoogleAnalytics
            gaMeasurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}
          /> */}
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
