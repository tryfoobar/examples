import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { init } from "commandbar";

import Layout from "../components/Layout";
import { CrudProvider } from "../components/CrudProvider";

import "../global.css";

if (typeof window !== "undefined") {
  init("5ba0a816");
}

function MyApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  const [commandBarReady, setCommandBarReady] = useState(false);

  useEffect(() => {
    window.CommandBar.boot("me").then(() => {
      setCommandBarReady(true);
    });

    return window.CommandBar.shutdown;
  }, []);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addCommand({
        name: "home",
        text: "Go to Home",
        category: "Navigation",
        icon: "https://openmoji.org/data/color/svg/E269.svg",
        template: { type: "link", value: "/", operation: "router" },
        availability_rules: [
          {
            type: "url",
            operator: "isNot",
            value: "/",
          },
        ],
      });
      window.CommandBar.addCommand({
        name: "foo",
        text: "Go to Foo",
        category: "Navigation",
        icon: "https://openmoji.org/data/color/svg/E269.svg",
        template: { type: "link", value: "/foo", operation: "router" },
        availability_rules: [
          {
            type: "url",
            operator: "isNot",
            value: "/foo",
          },
        ],
      });

      return () => {
        window.CommandBar.removeCommand("home");
        window.CommandBar.removeCommand("foo");
      };
    }
  }, [commandBarReady]);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addRouter(push);
    }
  }, [push, commandBarReady]);

  return (
    <CrudProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CrudProvider>
  );
}

export default MyApp;
