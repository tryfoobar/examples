import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    window.CommandBar.boot("me").then(() => {
      window.CommandBar.addCommand({
        name: "Home",
        text: "Home",
        category: "Navigation",
        template: { type: "link", value: "/", operation: "router" },
      });
      window.CommandBar.addCommand({
        name: "Fop",
        text: "Fop",
        category: "Navigation",
        template: { type: "link", value: "/fop", operation: "router" },
      });
    });
  }, []);

  useEffect(() => {
    window.CommandBar.addRouter(navigate);
  }, [navigate]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
